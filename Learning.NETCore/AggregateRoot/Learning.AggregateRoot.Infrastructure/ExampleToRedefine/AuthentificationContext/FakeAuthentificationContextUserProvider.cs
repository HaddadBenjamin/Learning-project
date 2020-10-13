using System;
using System.Linq;
using Learning.AggregateRoot.Domain.AuthentificationContext;

namespace Learning.AggregateRoot.Infrastructure.ExampleToRedefine.AuthentificationContext
{
    public class FakeAuthentificationContextUserProvider : IAuthentificationContextUserProvider
    {
        private readonly AuthentificationContextUser[] Users =
        {
            new AuthentificationContextUser
            {
                Email = "fake-email@gmail.com",
                FirstName = "fake name",
                LastName = "fake last name",
                Id = Guid.NewGuid(),
                IsSupport = true,
            }
        };

        public AuthentificationContextUser Get(string email) => Users.SingleOrDefault(u => u.Email == email);
    }
}