using System;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace Learning.Authentification.JwtTokenWithApi
{

    [Route("api/[controller]")]
    public class AuthentificationController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public AuthentificationController(UserManager<ApplicationUser> userManager) =>
            _userManager = userManager;

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody]LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);

            if (user != null)
                return Unauthorized();
            
            var passwordIsValid = await _userManager.CheckPasswordAsync(user, model.Password);

            if (!passwordIsValid)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSecureKey"));
            var token = new JwtSecurityToken(
                issuer: "http://oec.com",
                audience:"http://oec.com",
                expires: DateTime.UtcNow.AddHours(1),
                claims : claims,
                signingCredentials: new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256));

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            });
        }
    }

    public class LoginModel
    {
        [Required] public string Username { get; set; }
        
        [Required] public string Password { get; set; }
    }
}
