using System;
using System.Collections.Generic;
using System.Linq;

namespace Learning.PartialFields
{
    /// <summary>
    /// Pour éviter d'aller récupérer des données non nécéssaires, on pourrait envoyer des paramètres à votre query sql pour déterminer ce qu'elle doit récupérer.
    /// - GetAttributes = fieldsToMap.Contains("attributes")
    /// - GetLocation = fieldsToMap.Contains("location")
    /// - GetImage = fieldsToMap.Contains("image")
    /// </summary>
    public abstract class PartialMapper<TSource, TDestination>
        where TSource : class
        where TDestination : class
    {
        private readonly IPartialFields _fieldsToMap;
        private readonly Dictionary<string, Action<TSource, TDestination>> _mappers = new Dictionary<string, Action<TSource, TDestination>>(StringComparer.InvariantCultureIgnoreCase);

        public PartialMapper(IPartialFields fieldsToMap) => _fieldsToMap = fieldsToMap;

        public TDestination Map(TSource source) => Map(source, default);
        public TDestination Map(TSource source, TDestination destination)
        {
            if (destination is null)
                destination = Activator.CreateInstance(typeof(TDestination)) as TDestination;

            var sourceProperties = typeof(TSource).GetProperties();
            var destinationProperties = typeof(TDestination).GetProperties();

            foreach (var sourceProperty in sourceProperties)
            {
                var propertyName = sourceProperty.Name;

                if (!_fieldsToMap.Contains(sourceProperty.Name))
                    continue;

                if (_mappers.ContainsKey(propertyName))
                    _mappers[propertyName](source, destination);
                else
                    destinationProperties
                        .FirstOrDefault(f => f.Name == propertyName && f.PropertyType == sourceProperty.PropertyType)
                        ?.SetValue(destination, sourceProperty.GetValue(source));
            }

            return destination;
        }

        /// <summary>
        /// Use this method if the name and the type of field are different from the source and the destination or if your field need to be compute with several fields.
        /// </summary>
        protected void AddMappers(params (string field, Action<TSource, TDestination> action)[] mappers)
        {
            foreach (var mapper in mappers)
                _mappers[mapper.field] = mapper.action;
        }
    }
}