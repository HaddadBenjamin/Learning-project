using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Authentication.DependenyInjections
{
    public class DatabaseInjecter : IServiceInjecter
    {
        public void InjectService(IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            var writeModelConfiguration = configuration.GetSection("WriteModel").Get<WriteModelConfiguration>();

            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(writeModelConfiguration.ConnectionString));
        }
    }
}
