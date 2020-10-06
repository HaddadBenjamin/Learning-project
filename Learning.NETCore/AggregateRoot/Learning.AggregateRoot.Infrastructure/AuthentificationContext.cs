using System;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;

namespace Learning.AggregateRoot.Infrastructure
{
    public class AuthentificationContext : IAuthentificationContext
    {
        public AuthentificationContext(IRequestContext requestContext, IAuthentificationContextUserProvider userProvider)
        {
            CorrelationId = requestContext.CorrelationId;

            if (requestContext.ImpersonatedUserEmail != null)
                User = ImpersonatedUser = userProvider.Get(requestContext.ImpersonatedUserEmail);

            if (requestContext.UserEmail != null)
            {
                User = userProvider.Get(requestContext.UserEmail);

                if (ImpersonatedUser is null)
                    ImpersonatedUser = User;
            }
        }

        public IAuthentificationContextUser User { get; set; }
        public IAuthentificationContextUser ImpersonatedUser { get; set; }
        public Guid CorrelationId { get; set; }
    }
}