using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Authentication.DependenyInjections
{
    public class DatabaseInjecter : IServiceInjecter
    {
        public void InjectService(IServiceCollection services, IConfiguration configuration) => services
            .AddDefaultIdentity<IdentityUser>()
            .AddEntityFrameworkStores<ApplicationDbContext>();
    }
}
