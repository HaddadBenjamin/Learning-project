using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Authentication.Configurations;
using Authentication.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Authentication.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly JwtConfiguration _jwtConfiguration;

        public IdentityService(UserManager<ApplicationUser> userManager, JwtConfiguration jwtConfiguration)
        {
            _userManager = userManager;
            _jwtConfiguration = jwtConfiguration;
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

        private AuthenticationResult GenerateUserAuthenticationSuccessResult(IdentityUser user) => new AuthenticationResult
        {
            Success = true,
            AccessToken = GenerateUserAccessToken(user)
        };

        private string GenerateUserAccessToken(IdentityUser user)
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
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenSignature), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}