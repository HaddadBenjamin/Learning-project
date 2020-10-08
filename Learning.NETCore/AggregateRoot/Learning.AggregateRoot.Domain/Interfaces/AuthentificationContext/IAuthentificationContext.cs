using System;

namespace Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext
{
    public interface IAuthentificationContext
    {
        IAuthentificationContextUser User { get; set; }
        IAuthentificationContextUser ImpersonatedUser { get; set; }
        Guid CorrelationId { get; set; }
    }
}