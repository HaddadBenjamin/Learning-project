using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Authentication.Persistence.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<RefreshToken> RefreshTokens { get; set; }
    }
}
