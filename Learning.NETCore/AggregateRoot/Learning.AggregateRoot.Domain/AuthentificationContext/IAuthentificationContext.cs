using System;

namespace Learning.AggregateRoot.Domain.AuthentificationContext
{
    /// <summary>
    /// Contient des informations de la personne qui nous contact ce qui permet de faire de l'audit.
    /// </summary>
    public interface IAuthentificationContext
    {
        AuthentificationContextUser User { get; set; }
        AuthentificationContextUser ImpersonatedUser { get; set; }
        Guid CorrelationId { get; set; }
    }
}