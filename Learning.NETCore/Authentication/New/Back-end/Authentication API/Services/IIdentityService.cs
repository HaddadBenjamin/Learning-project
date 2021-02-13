using System.Collections.Generic;
using System.Threading.Tasks;
namespace Authentication.Services
{
    public interface IIdentityService
    {
        Task<AuthenticationResult> RegisterAsync(string email, string password);
        Task<AuthenticationResult> LoginAsync(string email, string password);
    }

    public class AuthenticationResult
    {
        public string AccessToken { get; set; }
        public bool Success { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}