using System.ComponentModel.DataAnnotations;

namespace Authentication.Controllers
{
    public class UserRegistrationRequest
    {
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}