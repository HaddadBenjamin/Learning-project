using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Learning.Mediator.DependencyInjection
{
    public static class ServiceRegistar
    {
        public static void ConnectImplementationsToTypesClosing(Type openRequestInterface, IServiceCollection services, IEnumerable<Assembly> assembliesToScan)
        {
            var concretions = new List<Type>();
            var interfaces = new List<Type>();
            foreach (var type in assembliesToScan.SelectMany(a => a.DefinedTypes).Where(t => !t.IsOpenGeneric()))
            {
                var interfaceTypes = type.FindInterfacesThatClose(openRequestInterface).ToArray();
                if (!interfaceTypes.Any()) continue;

                if (type.IsConcrete()) concretions.Add(type);

                foreach (var interfaceType in interfaceTypes) interfaces.Fill(interfaceType);
            }

            foreach (var @interface in interfaces)
            {
                var exactMatches = concretions.Where(x => x.CanBeCastTo(@interface)).ToList();
                foreach (var type in exactMatches)
                    services.AddTransient(@interface, type);

                if (!@interface.IsOpenGeneric()) AddConcretionsThatCouldBeClosed(@interface, concretions, services);
            }
        }

        public static bool IsOpenGeneric(this Type type) => type.GetTypeInfo().IsGenericTypeDefinition || type.GetTypeInfo().ContainsGenericParameters;
     
        public static bool IsConcrete(this Type type) => !type.GetTypeInfo().IsAbstract && !type.GetTypeInfo().IsInterface;
      
        public static IEnumerable<Type> FindInterfacesThatClose(this Type pluggedType, Type templateType) => FindInterfacesThatClosesCore(pluggedType, templateType).Distinct();

        private static bool IsMatchingWithInterface(Type handlerType, Type handlerInterface)
        {
            if (handlerType == null || handlerInterface == null)
                return false;

            if (handlerType.IsInterface)
            {
                if (handlerType.GenericTypeArguments.SequenceEqual(handlerInterface.GenericTypeArguments))
                    return true;
            }
            else
                return IsMatchingWithInterface(handlerType.GetInterface(handlerInterface.Name), handlerInterface);

            return false;
        }

        private static void AddConcretionsThatCouldBeClosed(Type @interface, List<Type> concretions, IServiceCollection services)
        {
            foreach (var type in concretions.Where(x => x.IsOpenGeneric() && x.CouldCloseTo(@interface)))
            {
                try { services.TryAddTransient(@interface, type.MakeGenericType(@interface.GenericTypeArguments)); }
                catch (Exception) { }
            }
        }

        private static bool CouldCloseTo(this Type openConcretion, Type closedInterface)
        {
            var openInterface = closedInterface.GetGenericTypeDefinition();
            var arguments = closedInterface.GenericTypeArguments;
            var concreteArguments = openConcretion.GenericTypeArguments;

            return arguments.Length == concreteArguments.Length && openConcretion.CanBeCastTo(openInterface);
        }

        private static bool CanBeCastTo(this Type pluggedType, Type pluginType)
        {
            if (pluggedType == null) return false;
            if (pluggedType == pluginType) return true;

            return pluginType.GetTypeInfo().IsAssignableFrom(pluggedType.GetTypeInfo());
        }

        private static IEnumerable<Type> FindInterfacesThatClosesCore(Type pluggedType, Type templateType)
        {
            if (pluggedType == null) yield break;
            if (!pluggedType.IsConcrete()) yield break;
            if (templateType.GetTypeInfo().IsInterface)
            {
                foreach (var interfaceType in pluggedType.GetInterfaces().Where(type => type.GetTypeInfo().IsGenericType && (type.GetGenericTypeDefinition() == templateType)))
                    yield return interfaceType;
            }
            else if (pluggedType.GetTypeInfo().BaseType.GetTypeInfo().IsGenericType && (pluggedType.GetTypeInfo().BaseType.GetGenericTypeDefinition() == templateType))
                yield return pluggedType.GetTypeInfo().BaseType;

            if (pluggedType.GetTypeInfo().BaseType == typeof(object)) yield break;

            foreach (var interfaceType in FindInterfacesThatClosesCore(pluggedType.GetTypeInfo().BaseType, templateType))
                yield return interfaceType;
        }

        private static void Fill<T>(this IList<T> list, T value)
        {
            if (list.Contains(value)) return;
            list.Add(value);
        }
    }
}