using Learning.AggregateRoot.Domain.Audit;
using Learning.AggregateRoot.Infrastructure.DbContext.Aggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Learning.AggregateRoot.Infrastructure.DbContext.Audit
{
    public class AuditDatabaseChangeMapper : AggregateMap<AuditDatabaseChange>
    {
        protected override void Map(EntityTypeBuilder<AuditDatabaseChange> entity)
        {
            entity.HasKey(auditDatabaseChange => auditDatabaseChange.Id);

            entity.Property(auditDatabaseChange => auditDatabaseChange.Action).IsRequired();
            entity.Property(auditDatabaseChange => auditDatabaseChange.Delta).HasColumnType("text");
            entity.Property(auditDatabaseChange => auditDatabaseChange.TableName).HasMaxLength(50);
            entity.Property(auditDatabaseChange => auditDatabaseChange.Action).HasMaxLength(20);

            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.Id);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.EntityId);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.AggregateRootId);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.TableName);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.Action);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.CorrelationId);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.Date);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.UserId);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.ImpersonatedUserId);
        }
    }
}