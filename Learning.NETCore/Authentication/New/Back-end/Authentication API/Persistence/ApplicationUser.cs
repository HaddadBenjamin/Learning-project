using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Authentication.Persistence
{
    public class ApplicationUser : IdentityUser
    {
        public virtual ICollection<Post> Posts { get; set; }
    }
}
