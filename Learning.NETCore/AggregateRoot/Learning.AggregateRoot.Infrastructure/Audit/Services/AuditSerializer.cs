using Learning.AggregateRoot.Domain.Audit.Services;
using Newtonsoft.Json;

namespace Learning.AggregateRoot.Infrastructure.Audit.Services
{
    public class AuditSerializer : IAuditSerializer
    {
        private static readonly JsonSerializerSettings SerializerSettings = new JsonSerializerSettings
        {
            NullValueHandling = NullValueHandling.Ignore,
            DateTimeZoneHandling = DateTimeZoneHandling.Utc
        };

        public string Serialize(object @object) => JsonConvert.SerializeObject(@object, Formatting.Indented, SerializerSettings);
    }
}