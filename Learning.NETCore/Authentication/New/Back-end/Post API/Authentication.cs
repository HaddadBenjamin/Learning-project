using System.Threading.Tasks;
using Authentication.Contracts;
using Microsoft.AspNetCore.Http;
using Refit;

namespace Post.Authentication
{
    public interface IAuthenticationContext
    {
        public UserDto MyUser { get; }
    }

    public class AuthenticationContext : IAuthenticationContext
    {
        private readonly IUserApi _userApi;
        private UserDto _myUser;

        public AuthenticationContext(IUserApi userApi) => _userApi = userApi;

        public UserDto MyUser
        { 
            get
            {
                if (_myUser == null)
                    _myUser = _userApi.Me().Result;
              
                return _myUser;
            }
        }
    }

    [Headers("Content-Type: application/json",
             "Accept: application/json")]
    public interface IUserApiClient
    {
        [Get("/me")]
        public Task<UserDto> Me([Header("Authorization")] string authorization);
    }

    public interface IUserApi
    {
        public Task<UserDto> Me();
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

        public async Task<UserDto> Me()
        {
            var authorizationHeader = Helpers.Helpers.GetHeaderOrDefault(_httpContextAccessor.HttpContext, "Authorization");

            try
            {
                return await _userApiClient.Me(authorizationHeader);
            }
            catch (ApiException e)
            {

            }

            return null;
        }
    }
}