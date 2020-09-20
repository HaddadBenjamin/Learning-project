using System;
using System.Linq;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace Learning.Mediator.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
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
                ServiceRegistar.ConnectImplementationsToTypesClosing(handlerInterface, services, assembliesToScan);
                   
                var concretions = assembliesToScan
                    .SelectMany(a => a.DefinedTypes)
                    .Where(type => type.FindInterfacesThatClose(handlerInterface).Any() && type.IsConcrete() && type.IsOpenGeneric())
                    .ToList();

                foreach (var type in concretions)
                    services.AddTransient(handlerInterface, type);
            }

            return services.AddSingleton<IMediator, Mediator>();
        }

        public static IServiceCollection RegisterMediator(this IServiceCollection services, params Type[] types) =>
            RegisterMediator(services, types.Select(t => t.Assembly).ToArray());
    }
}
