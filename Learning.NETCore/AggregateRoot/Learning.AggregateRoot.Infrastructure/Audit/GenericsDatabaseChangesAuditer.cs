using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;
using Learning.AggregateRoot.Infrastructure.DbContext.Audit;
using Learning.AggregateRoot.Infrastructure.Example.DbContext;

namespace Learning.AggregateRoot.Infrastructure.Audit
{
    public class GenericsDatabaseChangesAuditer : DatabaseChangesAuditer<YourDbContext>
    {
        public GenericsDatabaseChangesAuditer(IAuthentificationContext authentificationContext, AuditDbContext auditDbContext, YourDbContext dbContext) :
            base(authentificationContext, auditDbContext, dbContext) { }
    }
}