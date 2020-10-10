using Learning.AggregateRoot.Domain.Audit;
using Learning.AggregateRoot.Infrastructure.DbContext.Aggregate;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Learning.AggregateRoot.Infrastructure.DbContext.Audit
{
    public class AuditDatabaseChangeMapper : AggregateMap<AuditDatabaseChange>
    {
        protected override void Map(EntityTypeBuilder<AuditDatabaseChange> entity)
        {
            entity.HasKey(auditDatabaseChange => auditDatabaseChange.Id);

            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.Id);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.Action);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.EntityId);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.TableName);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.Delta);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.CorrelationId);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.Date);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.UserId);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.ImpersonatedUserId);

            entity.Property(auditDatabaseChange => auditDatabaseChange.Action).IsRequired();
        }
    }
}