using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Authentication.DependenyInjections
{
    interface IServiceInjecter
    {
        void InjectService(IServiceCollection services, IConfiguration configuration);
    }
}
