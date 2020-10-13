using Learning.AggregateRoot.Domain.Audit.Services;
using Learning.AggregateRoot.Domain.AuthentificationContext.Interfaces;
using Learning.AggregateRoot.Infrastructure.DbContext.Audit;
using Learning.AggregateRoot.Infrastructure.Example.DbContext;

namespace Learning.AggregateRoot.Infrastructure.Audit
{
    public class GenericsDatabaseChangesAuditService : DatabaseChangesAuditService<YourDbContext>
    {
        public GenericsDatabaseChangesAuditService(IAuthentificationContext authentificationContext, AuditDbContext auditDbContext, YourDbContext dbContext, IAuditSerializer auditSerializer) :
            base(authentificationContext, auditDbContext, dbContext, auditSerializer) { }
    }
}