using System;

namespace Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext
{
    public interface IAuthentificationContextUser
    {
        Guid Id { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
        string Email { get; set; }
        bool IsSupport { get; set; }
    }
}