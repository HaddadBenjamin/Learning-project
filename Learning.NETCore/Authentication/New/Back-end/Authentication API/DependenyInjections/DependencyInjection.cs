using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Authentication.DependenyInjections
{
    public static class DependencyInjection
    {
        public static void AddAuthentication(IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers();

            ServiceInjecterHelper.InjectServicesFromAssembly(typeof(Startup).Assembly, services, configuration);
        }
    }
}
