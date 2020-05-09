using System;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
        private readonly ApplicationDbContext _dbContext;

        public AuthentificationController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _dbContext = dbContext;
        }

        [HttpPost]
        [Route("signin")]
        [AllowAnonymous]
        public async Task<IActionResult> SignIn([FromBody] SignInModel model)
        {
            var user = new ApplicationUser {UserName = model.Username};
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return BadRequest(string.Join(Environment.NewLine, result.Errors.Select(error => error.Description)));

            await _signInManager.SignInAsync(user, false, JwtBearerDefaults.AuthenticationScheme);

            return await Login(new LoginModel
            {
                Password = model.Password,
                Username = model.Username
            });
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);

            if (user == null)
                return Unauthorized();

            var passwordIsValid = await _userManager.CheckPasswordAsync(user, model.Password);

            if (!passwordIsValid)
                return Unauthorized();

            return GenerateLoginResponse(user);
        }

        [AllowAnonymous]
        [HttpPost("loginWithGoogle")]
        public async Task<IActionResult> LoginWithGoogle([FromBody]LoginWithGoogleModel model)
        {
            GoogleJsonWebSignature.Payload googlePayload = new GoogleJsonWebSignature.Payload();

            try { googlePayload = await GoogleJsonWebSignature.ValidateAsync(model.TokenId, new GoogleJsonWebSignature.ValidationSettings()); }
            catch (Exception exception) { return BadRequest(exception.Message); }

            var user = CreateUserIfNotExists(googlePayload.Name, googlePayload.Email);

            return GenerateLoginResponse(user);
        }

        [AllowAnonymous]
        [HttpPost("loginWithFacebook")]
        public async Task<IActionResult> LoginWithFacebook([FromBody] LoginWithFacebookModel model)
        {
            var user = CreateUserIfNotExists(model.Name, model.Email);

            return GenerateLoginResponse(user);
        }

        private IActionResult GenerateLoginResponse(ApplicationUser user)
        {
            var encodedBearerToken = GenerateEncodedBearerToken(user);

            return Ok(new
            {
                Token = encodedBearerToken,
                Username = user.UserName
            });
        }

        private static string GenerateEncodedBearerToken(ApplicationUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("thiskeyshouldbeatleastof16characters"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email ?? user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                // Le claim iss corresond à l'URL du serveur qui a émit ce token (nous-même).
                issuer: "https://diablo-2-enriched-documentation.netlify.app/",
                // La claim aud correspond à l'URL du serveur de resource qui va accepter le token (nous-même).
                audience: "https://diablo-2-enriched-documentation.netlify.app/",
                expires: DateTime.UtcNow.AddHours(1),
                claims: claims,
                // Clé pour valider la signature de vos tokens.
                signingCredentials: credentials);

            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

            return encodedToken;
        }

        private ApplicationUser CreateUserIfNotExists(string username, string email)
        {
            var user = _dbContext.Users
                .Where(user => user.Email == email)
                .FirstOrDefault();
            var userDontExists = user is null;

            if (userDontExists)
            {
                user = new ApplicationUser
                {
                    Id = Guid.NewGuid().ToString(),
                    UserName = username,
                    Email = email
                };

                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();
            }

            return user;
        }

        [HttpPost]
        [Route("logout")]
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

    public class LoginWithGoogleModel
    {
        [Required] public string TokenId { get; set; }
    }

    public class LoginWithFacebookModel
    {
        [Required] public string Name { get; set; }

        [Required] public string Email { get; set; }
    }

    public class SignInModel
    {
        [Required] public string Username { get; set; }

        [Required] public string Password { get; set; }
    }
}