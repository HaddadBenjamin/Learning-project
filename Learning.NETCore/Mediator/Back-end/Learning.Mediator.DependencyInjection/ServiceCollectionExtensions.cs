using System;
using System.Collections.Generic;
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

            var handlerInterfaces = new[]            {
                typeof(ICommandHandler<>),
                typeof(ICommandHandler<,>),
                typeof(IQueryHandler<,>),
                typeof(IEventHandler<>),
            };

            foreach (var handlerInterface in handlerInterfaces)
                services.AddClassesAsImplementedInterface(handlerInterface, assembliesToScan);
            
            return services.AddSingleton<IMediator, Mediator>();
        }

        private static void AddClassesAsImplementedInterface(this IServiceCollection services, Type compareType, params Assembly[] assembliesToScan)
        {
            assembliesToScan.SelectMany(assembly => assembly.GetTypesAssignableTo(compareType)).ToList().ForEach((type) =>
            {
                foreach (var implementedInterface in type.ImplementedInterfaces)
                    services.AddTransient(implementedInterface, type);
            });
        }

        private static IEnumerable<TypeInfo> GetTypesAssignableTo(this Assembly assembly, Type compareType) =>
            assembly.DefinedTypes.Where(x => x.IsClass && !x.IsAbstract && x != compareType && x.GetInterfaces().Any(i => i.IsGenericType && i.GetGenericTypeDefinition() == compareType));
    }
}
