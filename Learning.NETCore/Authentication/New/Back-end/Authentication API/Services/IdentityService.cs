using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Authentication.Configurations;
using Authentication.Exceptions;
using Authentication.Persistence;
using Authentication.Persistence.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Authentication.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly JwtConfiguration _jwtConfiguration;
        private readonly ApplicationDbContext _dbContext;
        private readonly TokenValidationParameters _tokenValidationParameters;

        public IdentityService(
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

        public async Task<AuthenticationResult> RegisterAsync(string email, string password)
        {
            var userExists = await _userManager.FindByEmailAsync(email) != null;

            if (userExists)
                return new AuthenticationResult { Errors = new[] { "User with this email already exists" } };

            var newUser = new ApplicationUser
            {
                UserName = email,
                Email = email
            };
            var createUserResult = await _userManager.CreateAsync(newUser, password);

            if (!createUserResult.Succeeded)
                return new AuthenticationResult { Errors = createUserResult.Errors.Select(e => e.Description) };

            return GenerateUserAuthenticationSuccessResult(newUser);
        }

        public async Task<AuthenticationResult> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                return new AuthenticationResult { Errors = new[] { "User don't exists" } };

            var passwordIsValid = await _userManager.CheckPasswordAsync(user, password);

            if (!passwordIsValid)
                return new AuthenticationResult { Errors = new[] { "The combination of user/password is not valid" } };

            return GenerateUserAuthenticationSuccessResult(user);
        }

        public void Logout(string accessToken, string refreshToken, string userId)
        {
            _signInManager.SignOutAsync();

            RevokeRefreshToken(accessToken, refreshToken);
        }

        public async Task<AuthenticationResult> RefreshTokenAsync(string accessToken, string refreshToken)
        {
            var (tokenIsValid, claimsPrincipal) = ValidateToken(accessToken);

            if (!tokenIsValid)
                return new AuthenticationResult { Errors = new[] { "The token is not valid" } };

            var expiryDateUnix = long.Parse(claimsPrincipal.Claims.Single(c => c.Type == JwtRegisteredClaimNames.Exp).Value);
            var expiryDateUtc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(expiryDateUnix);
            var tokenHasExpired = DateTime.UtcNow > expiryDateUtc;

            if (!tokenHasExpired)
                return new AuthenticationResult { Errors = new[] { "The token has not expired yet" } };
            
            var userRefreshToken = _dbContext.RefreshTokens.SingleOrDefault(r => r.RefreshTokenValue == refreshToken);

            if (userRefreshToken == null)
                return new AuthenticationResult { Errors = new[] { "The refresh token does not exists" } };
          
            var refreshTokenHasExpired = DateTime.UtcNow > userRefreshToken.ExpiryDate;
           
            if (refreshTokenHasExpired)
                return new AuthenticationResult { Errors = new[] { "The refresh token has expired" } };

            if (userRefreshToken.Invalidated)
                return new AuthenticationResult { Errors = new[] { "The refresh token has been invalidated" } };
          
            var jtiClaimValue = claimsPrincipal.Claims.Single(c => c.Type == JwtRegisteredClaimNames.Jti).Value;
            var refreshTokenMatchWithTheAccessToken = jtiClaimValue == userRefreshToken.JwtId;

            if (!refreshTokenMatchWithTheAccessToken)
                return new AuthenticationResult { Errors = new[] { "The refresh token does not match with the provided access token" } };

            if (userRefreshToken.Used)
                return new AuthenticationResult { Errors = new[] { "The refresh token has already been used" } };

            userRefreshToken.Used = true;
            _dbContext.RefreshTokens.Update(userRefreshToken);
            await _dbContext.SaveChangesAsync();

            var userId = claimsPrincipal.Claims.Single(c => c.Type == "id").Value;
            var user = await _userManager.FindByIdAsync(userId);

            return GenerateUserAuthenticationSuccessResult(user);
        }

        public void RevokeRefreshToken(string accessToken, string refreshToken)
        {
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
        }

        private AuthenticationResult GenerateUserAuthenticationSuccessResult(ApplicationUser user)
        {
            var securityAccessToken = GenerateUserAccessToken(user);
            var accessToken = new JwtSecurityTokenHandler().WriteToken(securityAccessToken);
            var refreshToken = GenerateAndPersistUserRefreshToken(securityAccessToken, user);

            return new AuthenticationResult
            {
                Success = true,
                AccessToken = accessToken,
                RefreshToken = refreshToken.RefreshTokenValue
            };
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
}