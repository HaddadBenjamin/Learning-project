using System.Collections.Generic;
using System.Threading.Tasks;
namespace Authentication.Services
{
    public interface IIdentityService
    {
        Task<AuthenticationResult> RegisterAsync(string email, string password);
        Task<AuthenticationResult> LoginAsync(string email, string password);
        void Logout(string accessToken, string refreshToken, string userId);
        Task<AuthenticationResult> RefreshTokenAsync(string accessToken, string refreshToken);
        void RevokeRefreshToken(string accessToken, string refreshToken);
    }

    public class AuthenticationResult
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public bool Success { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}