using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Authentication.Persistence;
using Authentication.Exceptions;
using Authentication.Utilities;
using Authentication.Contracts;

namespace Authentication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly TokenUtilities _tokenUtilities;

        public UserController(ApplicationDbContext dbContext, TokenUtilities tokenUtilities)
        {
            _dbContext = dbContext;
            _tokenUtilities = tokenUtilities;
        }

        /// <summary>
        /// Get the user information.
        /// </summary>
        [HttpGet]
        [Route("me")]
        public IActionResult Me()
        {
            var accessToken = Helpers.GetAccessToken(HttpContext);

            _tokenUtilities.ValidateAccessToken(accessToken);

            var userId = _tokenUtilities.GetUserId(accessToken);
            var user = _dbContext.Users.SingleOrDefault(_ => _.Id == userId);

            if (user == null)
                throw new NotFoundException(nameof(ApplicationUser), userId);

            return Ok(new UserDto
            {
                Id = user.Id,
                Name = user.UserName,
                Email = user.Email
            });
        }
    }
}