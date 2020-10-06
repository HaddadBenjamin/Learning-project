using System;

namespace Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext
{
    // Doit être setté par un middleware.
    public interface IAuthentificationContext
    {
        IAuthentificationContextUser User { get; set; }
        IAuthentificationContextUser ImpersonatedUser { get; set; }
        Guid CorrelationId { get; set; }
    }
}