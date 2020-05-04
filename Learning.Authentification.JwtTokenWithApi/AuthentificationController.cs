using System;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthentificationController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        [Route("signin")]
        public async Task<IActionResult> SignIn([FromBody] SignInModel model)
        {
            var user = new ApplicationUser {UserName = model.Username};
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return BadRequest(string.Join(Environment.NewLine, result.Errors.Select(error => error.Description)));

            await _signInManager.SignInAsync(user, false);

            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);

            if (user == null)
                return Unauthorized();

            var passwordIsValid = await _userManager.CheckPasswordAsync(user, model.Password);

            if (!passwordIsValid)
                return Unauthorized();

            var encodedBearerToken = GenerateBearerToken(user);

            return Ok(new
            {
                token = encodedBearerToken,
            });
        }

        private static string GenerateBearerToken(ApplicationUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("thiskeyshouldbeatleastof16characters"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: "https://diablo-2-enriched-documentation.netlify.app/",
                audience: "https://diablo-2-enriched-documentation.netlify.app/",
                expires: DateTime.UtcNow.AddHours(1),
                claims: claims,
                signingCredentials: credentials);

            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

            return encodedToken;
        }

        [HttpPost]
        [Route("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return Ok();
        }
    }

    public class LoginModel
    {
        [Required] public string Username { get; set; }
        
        [Required] public string Password { get; set; }
    }

    public class SignInModel
    {
        [Required] public string Username { get; set; }

        [Required] public string Password { get; set; }
    }
}