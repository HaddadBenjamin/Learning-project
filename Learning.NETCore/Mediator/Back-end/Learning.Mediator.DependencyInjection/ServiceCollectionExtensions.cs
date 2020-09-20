using System;
using System.Linq;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace Learning.Mediator.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection RegisterMediator(this IServiceCollection services, params Assembly[] assemblies)
        {
            // enregistrer toutes les dépendances génériques des handlers (command, query, event).
            return services.AddSingleton<IMediator, Mediator>();
        }

        public static IServiceCollection RegisterMediator(this IServiceCollection services, params Type[] types) =>
            RegisterMediator(services, types.Select(t => t.Assembly).ToArray());
    }
}
