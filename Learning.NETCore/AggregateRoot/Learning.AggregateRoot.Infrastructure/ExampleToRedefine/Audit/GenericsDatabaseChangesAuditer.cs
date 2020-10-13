using Learning.AggregateRoot.Domain.Audit.Configuration;
using Learning.AggregateRoot.Domain.Audit.Services;
using Learning.AggregateRoot.Domain.AuthentificationContext;
using Learning.AggregateRoot.Infrastructure.Audit.DbContext.Audit;
using Learning.AggregateRoot.Infrastructure.Audit.Services;
using Learning.AggregateRoot.Infrastructure.ExampleToRedefine.DbContext;

namespace Learning.AggregateRoot.Infrastructure.ExampleToRedefine.Audit
{
    public class GenericsDatabaseChangesAuditService : DatabaseChangesAuditService<YourDbContext>
    {
        public GenericsDatabaseChangesAuditService(
            IAuthentificationContext authentificationContext,
            IAuditSerializer auditSerializer,
            AuditConfiguration auditConfiguration,
            AuditDbContext auditDbContext,
            YourDbContext dbContext) :
            base(authentificationContext, auditSerializer, auditConfiguration, auditDbContext, dbContext) { }
    }
}