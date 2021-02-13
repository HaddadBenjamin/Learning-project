using System.Linq;
using System.Threading.Tasks;
using Authentication.Requests;
using Authentication.Responses;
using Authentication.Services;
using Microsoft.AspNetCore.Mvc;

namespace Authentication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IdentityController : ControllerBase
    {
        private readonly IIdentityService _identityService;

        public IdentityController(IIdentityService identityService) => _identityService = identityService;

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(UserRegistrationRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(new AuthenticationFailledResponse { Errors = ModelState.Values.SelectMany(_ => _.Errors.Select(e => e.ErrorMessage)) }); ;

            var authenticationResult = await _identityService.RegisterAsync(request.Email, request.Password);

            return GetAuthenticationResponse(authenticationResult);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(UserLoginRequest request)
        {
            var authenticationResult = await _identityService.LoginAsync(request.Email, request.Password);

            return GetAuthenticationResponse(authenticationResult);
        }

        private IActionResult GetAuthenticationResponse(AuthenticationResult authenticationResult) => authenticationResult.Success ?
            Ok(new AuthenticationSuccessResponse { Token = authenticationResult.Token }) :
            BadRequest(new AuthenticationFailledResponse { Errors = authenticationResult.Errors });
    }
}