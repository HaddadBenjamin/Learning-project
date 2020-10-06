using System;

namespace Learning.AggregateRoot.Domain.Interfaces
{
    public interface IRequestContext
    {
        string ImpersonatedUserEmail { get; set; }
        string UserEmail { get; set; }
        Guid CorrelationId { get; set; }
        string ClientApplication { get; set; }
        string ReadVersion { get; set; }
        string WriteVersion { get; set; }
    }
}