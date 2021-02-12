using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Authentication.DependenyInjections
{
    interface IInjecter
    {
        void InjectService(IServiceCollection services, IConfiguration configuration);
    }
}
