using Authentication.Configurations;
using Authentication.Persistence;
using Authentication.Persistence.Entities;
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
                .AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddSignInManager<SignInManager<ApplicationUser>>();
            
            var writeModelConfiguration = configuration.GetSection("WriteModel").Get<WriteModelConfiguration>();

            services.AddSingleton(writeModelConfiguration);
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(writeModelConfiguration.ConnectionString));
        }
    }
}
