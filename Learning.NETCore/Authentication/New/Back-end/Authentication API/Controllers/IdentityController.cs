using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Authentication.Configurations;
using Authentication.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Authentication.Exceptions;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.ComponentModel.DataAnnotations;

namespace Authentication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IdentityController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly JwtConfiguration _jwtConfiguration;
        private readonly ApplicationDbContext _dbContext;
        private readonly TokenValidationParameters _tokenValidationParameters;


        public IdentityController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            JwtConfiguration jwtConfiguration,
            ApplicationDbContext dbContext,
            TokenValidationParameters tokenValidationParameters)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtConfiguration = jwtConfiguration;
            _dbContext = dbContext;
            _tokenValidationParameters = tokenValidationParameters;
        }

        /// <summary>
        /// Generate a new access token and refresh token, the front will store them.
        /// </summary>
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> SignIn(UserRegistrationRequest request)
        {
            var (email, password) = (request.Email, request.Password);
            var userExists = await _userManager.FindByEmailAsync(email) != null;

            if (userExists)
                throw new BadRequestException("User with this email already exists");

            var newUser = new ApplicationUser
            {
                UserName = email,
                Email = email
            };
            var createUserResult = await _userManager.CreateAsync(newUser, password);

            if (!createUserResult.Succeeded)
                throw new BadRequestException(string.Join("\n", createUserResult.Errors.Select(e => e.Description)));

            await _signInManager.SignInAsync(newUser, false, JwtBearerDefaults.AuthenticationScheme);

            return GenerateUserAccessTokenAndRefreshToken(newUser);
        }

        /// <summary>
        /// Generate a new access token and refresh token, the front will store them.
        /// </summary>
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(UserLoginRequest request)
        {
            var (email, password) = (request.Email, request.Password);
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                throw new BadRequestException("User don't exists");

            var passwordIsValid = await _userManager.CheckPasswordAsync(user, password);

            if (!passwordIsValid)
                throw new BadRequestException("The combination of user/password is not valid");

            return GenerateUserAccessTokenAndRefreshToken(user);
        }

        /// <summary>
        /// Revoke the refresh token (refresthToken.Invalided = true), must be logged to use this endpoint, the front must set those variables to null.
        /// </summary>
        [HttpPost]
        [Route("logout")]
        [Authorize]
        public async Task<IActionResult> Logout(LogoutRequest request)
        {
            var (accessToken, refreshToken) = (request.AccessToken, request.RefreshToken);

            _signInManager.SignOutAsync();

            RevokeRefreshToken(new RevokeRefreshTokenRequest { });

            return Ok();
        }

        /// <summary>
        /// Generate a new access and refresh token if the refresh token have not been revoked (password changed / logout / weird account behaviour), the front will store them.
        /// </summary>
        [HttpPost]
        [Route("refreshToken")]
        public async Task<IActionResult> RefreshToken(RefreshTokenRequest request)
        {
            var (accessToken, refreshToken) = (request.AccessToken, request.RefreshToken);
            var (tokenIsValid, claimsPrincipal) = ValidateToken(accessToken);

            if (!tokenIsValid)
                throw new BadRequestException("The token is not valid");

            var expiryDateUnix = long.Parse(claimsPrincipal.Claims.Single(c => c.Type == JwtRegisteredClaimNames.Exp).Value);
            var expiryDateUtc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(expiryDateUnix);
            var tokenHasExpired = DateTime.UtcNow > expiryDateUtc;

            if (!tokenHasExpired)
                throw new BadRequestException("The token has not expired yet");

            var userRefreshToken = _dbContext.RefreshTokens.SingleOrDefault(r => r.RefreshTokenValue == refreshToken);

            if (userRefreshToken == null)
                throw new BadRequestException("The refresh token does not exists");

            var refreshTokenHasExpired = DateTime.UtcNow > userRefreshToken.ExpiryDate;

            if (refreshTokenHasExpired)
                throw new BadRequestException("The refresh token has expired");

            if (userRefreshToken.Invalidated)
                throw new BadRequestException("The refresh token has been invalidated");

            var jtiClaimValue = claimsPrincipal.Claims.Single(c => c.Type == JwtRegisteredClaimNames.Jti).Value;
            var refreshTokenMatchWithTheAccessToken = jtiClaimValue == userRefreshToken.JwtId;

            if (!refreshTokenMatchWithTheAccessToken)
                throw new BadRequestException("The refresh token does not match with the provided access token");

            if (userRefreshToken.Used)
                throw new BadRequestException("The refresh token has already been used");

            userRefreshToken.Used = true;
            _dbContext.RefreshTokens.Update(userRefreshToken);
            await _dbContext.SaveChangesAsync();

            var userId = claimsPrincipal.Claims.Single(c => c.Type == "id").Value;
            var user = await _userManager.FindByIdAsync(userId);

            return GenerateUserAccessTokenAndRefreshToken(user);
        }

        /// <summary>
        /// Revoke the refresh token (refresthToken.Invalided = true), the front will set his refreshtoken to null.
        /// </summary>
        [HttpPost]
        [Route("revokeRefreshToken")]
        public IActionResult RevokeRefreshToken(RevokeRefreshTokenRequest request)
        {
            var (accessToken, refreshToken) = (request.AccessToken, request.RefreshToken);
            var (tokenIsValid, claimsPrincipal) = ValidateToken(accessToken);

            if (!tokenIsValid)
                throw new BadRequestException("The token is not valid");

            var userRefreshToken = _dbContext.RefreshTokens.SingleOrDefault(r => r.RefreshTokenValue == refreshToken);

            if (userRefreshToken == null)
                throw new NotFoundException(nameof(RefreshToken), refreshToken);

            var jtiClaimValue = claimsPrincipal.Claims.Single(c => c.Type == JwtRegisteredClaimNames.Jti).Value;
            var refreshTokenMatchWithTheAccessToken = jtiClaimValue == userRefreshToken.JwtId;

            if (!refreshTokenMatchWithTheAccessToken)
                throw new BadRequestException("The refresh token does not match with the provided access token");

            userRefreshToken.Invalidated = true;
            _dbContext.RefreshTokens.Update(userRefreshToken);
            _dbContext.SaveChanges();

            return Ok();
        }

        private IActionResult GenerateUserAccessTokenAndRefreshToken(ApplicationUser user)
        {
            var securityAccessToken = GenerateUserAccessToken(user);
            var accessToken = new JwtSecurityTokenHandler().WriteToken(securityAccessToken);
            var refreshToken = GenerateAndPersistUserRefreshToken(securityAccessToken, user);

            return Ok(new
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.RefreshTokenValue
            });
        }

        private SecurityToken GenerateUserAccessToken(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenSignature = Encoding.ASCII.GetBytes(_jwtConfiguration.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim("id", user.Id),
                }),
                Expires = DateTime.UtcNow.Add(_jwtConfiguration.AccessTokenLifetime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenSignature), SecurityAlgorithms.HmacSha256Signature)
            };

            return tokenHandler.CreateToken(tokenDescriptor);
        }

        private RefreshToken GenerateAndPersistUserRefreshToken(SecurityToken securityAccessToken, ApplicationUser user)
        {
            var refreshToken = new RefreshToken
            {
                RefreshTokenValue = Guid.NewGuid().ToString(),
                JwtId = securityAccessToken.Id,
                UserId = user.Id,
                CreationDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.Add(_jwtConfiguration.RefreshTokenLifetime)
            };

            _dbContext.RefreshTokens.Add(refreshToken);
            _dbContext.SaveChanges();

            return refreshToken;
        }

        // This method is complex, I should spend time to refactor it later
        private (bool isValid, ClaimsPrincipal claimsPrincipal) ValidateToken(string token)
        {
            try
            {
                var claimsPrincipal = new JwtSecurityTokenHandler().ValidateToken(token, _tokenValidationParameters, out var securityAccessToken);

                var tokenIsValid = (securityAccessToken is JwtSecurityToken jwtSecurityToken) &&
                    jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);

                return (tokenIsValid, tokenIsValid ? claimsPrincipal : null);
            }
            catch
            {
                return (false, null);
            }
        }
    }

    public class LogoutRequest
    {
        [Required] public string AccessToken { get; set; }
        [Required] public string RefreshToken { get; set; }
    }

    public class CreatePostRequest
    {
        [Required] public string Title { get; set; }
        [Required] public string Description { get; set; }
    }

    public class RefreshTokenRequest
    {
        [Required] public string AccessToken { get; set; }
        [Required] public string RefreshToken { get; set; }
    }

    public class RevokeRefreshTokenRequest
    {
        [Required] public string AccessToken { get; set; }
        [Required] public string RefreshToken { get; set; }
    }

    public class UserLoginRequest
    {
        [Required] public string Email { get; set; }
        [Required] public string Password { get; set; }
    }

    public class UserRegistrationRequest
    {
        [Required] [EmailAddress] public string Email { get; set; }
        [Required] public string Password { get; set; }
    }
}