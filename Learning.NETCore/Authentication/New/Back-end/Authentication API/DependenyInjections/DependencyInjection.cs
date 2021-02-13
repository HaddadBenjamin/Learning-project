using Authentication.Filters;
using Authentication.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Authentication.DependenyInjections
{
    public static class DependencyInjection
    {
        public static void AddAuthentication(IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers(options => options.Filters.Add(new ExceptionHandlerFilter()));

            services.AddScoped<IPostService, PostService>();
         
            ServiceInjecterHelper.InjectServicesFromAssembly(typeof(Startup).Assembly, services, configuration);
        }
    }
}
