using System;

namespace Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext
{
    public class AuthentificationContextUser
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool IsSupport { get; set; }
    }
}