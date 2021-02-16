using Authentication.Contracts;
using Microsoft.AspNetCore.Http;
using Refit;

namespace Post.Authentication
{
    public interface IAuthenticationContext
    {
        public UserDto MyUser { get; set; }
    }

    public class AuthenticationContext : IAuthenticationContext
    {
        public AuthenticationContext(IUserApi userApi) => MyUser = userApi.Me();

        public UserDto MyUser { get; set; }
    }

    [Headers("Content-Type: application/json",
             "Accept: application/json")]
    public interface IUserApiClient
    {
        [Get("me")]
        public UserDto Me([Header("Authorization")] string authorization);
    }

    public interface IUserApi
    {
        public UserDto Me();
    }

    public class UserApi : IUserApi
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserApiClient _userApiClient;

        public UserApi(IHttpContextAccessor httpContextAccessor, IUserApiClient userApiClient)
        {
            _httpContextAccessor = httpContextAccessor;
            _userApiClient = userApiClient;
        }

        public UserDto Me()
        {
            var authorizationHeader = Helpers.Helpers.GetHeaderOrDefault(_httpContextAccessor.HttpContext, "Authorization");

            try
            {
                return _userApiClient.Me(authorizationHeader);
            }
            catch (ApiException e)
            {

            }

            return null;
        }
    }
}