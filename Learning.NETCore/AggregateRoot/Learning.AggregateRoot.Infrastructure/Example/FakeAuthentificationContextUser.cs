using System;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;

namespace Learning.AggregateRoot.Infrastructure.Example
{
    public class FakeAuthentificationContextUser : IAuthentificationContextUser
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool IsSupport { get; set; }
    }
}