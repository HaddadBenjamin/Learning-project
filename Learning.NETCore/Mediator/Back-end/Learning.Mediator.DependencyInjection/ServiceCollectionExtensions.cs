using System;
using System.Linq;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace Learning.Mediator.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection RegisterMediator(this IServiceCollection services, params Type[] types) =>
            RegisterMediator(services, types.Select(t => t.Assembly).ToArray());

        public static IServiceCollection RegisterMediator(this IServiceCollection services, params Assembly[] assembliesToScan)
        {
            assembliesToScan = assembliesToScan.Distinct().ToArray();

            var handlerInterfaces = new[]
            {
                typeof(ICommandHandler<>),
                typeof(ICommandHandler<,>),
                typeof(IQueryHandler<,>),
                typeof(IEventHandler<>),
            };

            foreach (var handlerInterface in handlerInterfaces)
            {
                var typeAndInterfaces = assembliesToScan
                    .SelectMany(a => a.DefinedTypes)
                    .Where(type => type.IsClass)
                    .Select(type => new
                    {
                        type,
                        interfaces = type.GetInterfaces().Select(i => i.Name).ToList()
                    })
                    .ToList();
                
                foreach (var typeAndInterface in typeAndInterfaces)
                {
                    foreach (var interfaceName in typeAndInterface.interfaces)
                        if (interfaceName == handlerInterface.Name)
                            services.AddTransient(handlerInterface, typeAndInterface.type);
                }
            }

            return services.AddSingleton<IMediator, Mediator>();
        }
    }
}
