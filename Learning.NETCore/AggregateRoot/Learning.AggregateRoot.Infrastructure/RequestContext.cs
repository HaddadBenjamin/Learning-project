using System;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;

namespace Learning.AggregateRoot.Infrastructure
{
    public class RequestContext : IRequestContext
    {
        public string ImpersonatedUserEmail { get; set; }
        public string UserEmail { get; set; }
        public Guid CorrelationId { get; set; }
        public string ClientApplication { get; set; }
        public string ReadVersion { get; set; }
        public string WriteVersion { get; set; }
    }
}