using System;
using System.Linq;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Authentication.DependenyInjections
{
    public static class ServiceInjecterHelper
    {
        public static void InjectServicesFromAssembly(Assembly assembly, IServiceCollection services, IConfiguration configuration) =>
            assembly.ExportedTypes
                 .Where(e => typeof(IServiceInjecter).IsAssignableFrom(e) && !e.IsInterface && !e.IsAbstract)
                 .Select(Activator.CreateInstance)
                 .Cast<IServiceInjecter>()
                 .ToList()
                 .ForEach(injecter => injecter.InjectService(services, configuration));
    }
}
