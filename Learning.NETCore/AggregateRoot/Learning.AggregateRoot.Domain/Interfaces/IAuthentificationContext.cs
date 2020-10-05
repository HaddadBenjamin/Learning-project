using System;

namespace Learning.AggregateRoot.Domain.Interfaces
{
    // Doit être setté par un middleware.
    public interface IAuthentificationContext
    {
        IUser User { get; set; }
        IUser ImpersonifiedUser { get; set; }
        Guid CorrelationId { get; set; }
    }
}