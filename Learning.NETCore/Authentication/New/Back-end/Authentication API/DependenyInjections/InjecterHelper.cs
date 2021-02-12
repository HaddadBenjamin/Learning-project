using System;
using System.Linq;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Authentication.DependenyInjections
{
    public static class InjecterHelper
    {
        public static void InjectServicesFromAssembly(Assembly assembly, IServiceCollection services, IConfiguration configuration) =>
            assembly.ExportedTypes
                 .Where(e => typeof(IInjecter).IsAssignableFrom(e) && e.IsInterface && !e.IsAbstract)
                 .Select(Activator.CreateInstance)
                 .Cast<IInjecter>()
                 .ToList()
                 .ForEach(injecter => injecter.InjectService(services, configuration));
    }
}
