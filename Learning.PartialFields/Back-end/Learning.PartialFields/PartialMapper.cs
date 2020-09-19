using System;
using System.Collections.Generic;
using System.Linq;

namespace Learning.PartialFields
{
    /// <summary>
    /// Une alternative au mapping serait de faire _fieldsToMaps.Contains(field) alors je vais chercher en mémoire ces données et les mapper.
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

                if (!_fieldsToMap.Contains(propertyName))
                    continue;

                if (_mappers.ContainsKey(propertyName))
                    _mappers[propertyName](source, destination);
                else
                {
                    var destinationProperty = destinationProperties.FirstOrDefault(f => f.Name == propertyName && f.PropertyType == sourceProperty.PropertyType);

                    destinationProperty?.SetValue(destination, sourceProperty.GetValue(source));
                }
            }

            return destination;
        }

        /// <summary>
        /// Call this method if the mapping is complex, all simple mapping have been done automatically.
        /// </summary>
        protected void AddMappers(params (string field, Action<TSource, TDestination> action)[] mappers)
        {
            foreach (var mapper in mappers)
                _mappers[mapper.field] = mapper.action;
        }
    }
}