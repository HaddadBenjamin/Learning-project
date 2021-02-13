using System.ComponentModel.DataAnnotations;

namespace Authentication.Requests
{
    public class UserRegistrationRequest
    {
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}