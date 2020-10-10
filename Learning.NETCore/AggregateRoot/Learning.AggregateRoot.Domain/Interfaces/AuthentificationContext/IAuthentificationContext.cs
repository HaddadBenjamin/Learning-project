using System;

namespace Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext
{
    public interface IAuthentificationContext
    {
        AuthentificationContextUser User { get; set; }
        AuthentificationContextUser ImpersonatedUser { get; set; }
        Guid CorrelationId { get; set; }
    }
}