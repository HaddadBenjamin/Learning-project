using System.Linq;
using System.Threading.Tasks;
using Authentication.Extensions;
using Authentication.Requests;
using Authentication.Responses;
using Authentication.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Authentication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [AllowAnonymous]
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

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout(LogoutRequest request)
        {
            _identityService.Logout(request.AccessToken, request.RefreshToken, HttpContext.GetUserId()) ;

            return Ok();
        }

        [HttpPost]
        [Route("refreshToken")]
        public async Task<IActionResult> RefreshToken(RefreshTokenRequest request)
        {
            var authenticationResult = await _identityService.RefreshTokenAsync(request.AccessToken, request.RefreshToken);

            return GetAuthenticationResponse(authenticationResult);
        }

        [HttpPost]
        [Route("revokeRefreshToken")]
        public IActionResult RevokeRefreshToken(RevokeRefreshTokenRequest request)
        {
            _identityService.RevokeRefreshToken(request.AccessToken, request.RefreshToken);

            return Ok();
        }

        private IActionResult GetAuthenticationResponse(AuthenticationResult authenticationResult) => authenticationResult.Success ?
            Ok(new AuthenticationSuccessResponse
            {
                AccessToken = authenticationResult.AccessToken,
                RefreshToken = authenticationResult.RefreshToken
            }) :
            BadRequest(new AuthenticationFailledResponse { Errors = authenticationResult.Errors });
    }
}