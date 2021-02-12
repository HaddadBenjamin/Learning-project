using System.Threading.Tasks;
using Authentication.Controllers;
using Microsoft.AspNetCore.Identity;

/* Come back in 20 minutes ²*/
namespace Authentication
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly JwtConfiguration _jwtConfiguration;

        public IdentityService(UserManager<IdentityUser> userManager, JwtConfiguration jwtConfiguration)
        {
            _userManager = userManager;
            _jwtConfiguration = jwtConfiguration;
        }

        public async Task<AuthenticationResult> RegisterAsync(string email, string password)
        {
            // Hmmm, if not exist I just have to create it, why should I return an error when it's not found ?
            var user = await _userManager.FindByEmailAsync(email);

            if (user is not null &&)
                return new AuthenticationResult { Errors = new[] { "User does not exists" } };

            // check if user dont exists already
            // check if password validation is ok
            // create token & return

            throw new System.NotImplementedException();
        }

        public async Task<AuthenticationResult> LoginAsync(string email, string password)
        {
            throw new System.NotImplementedException();
        }
    }
}