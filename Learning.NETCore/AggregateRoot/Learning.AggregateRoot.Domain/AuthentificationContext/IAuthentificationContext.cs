using System;

namespace Learning.AggregateRoot.Domain.AuthentificationContext
{
    public interface IAuthentificationContext
    {
        AuthentificationContextUser User { get; set; }
        AuthentificationContextUser ImpersonatedUser { get; set; }
        Guid CorrelationId { get; set; }
    }
}