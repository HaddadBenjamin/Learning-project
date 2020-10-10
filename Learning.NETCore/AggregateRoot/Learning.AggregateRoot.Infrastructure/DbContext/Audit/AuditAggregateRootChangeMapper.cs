using Learning.AggregateRoot.Domain.Audit;
using Learning.AggregateRoot.Infrastructure.DbContext.Aggregate;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Learning.AggregateRoot.Infrastructure.DbContext.Audit
{
    public class AuditAggregateRootChangeMapper : AggregateMap<AuditAggregateRootChange>
    {
        protected override void Map(EntityTypeBuilder<AuditAggregateRootChange> entity)
        {
            entity.HasKey(auditEvent => auditEvent.Id);

            entity.HasIndex(auditEvent => auditEvent.Id);
            entity.HasIndex(auditEvent => auditEvent.Action);
            entity.HasIndex(auditEvent => auditEvent.AggregateRootId);
            entity.HasIndex(auditEvent => auditEvent.TableName);
            entity.HasIndex(auditEvent => auditEvent.Delta);
            entity.HasIndex(auditEvent => auditEvent.CorrelationId);
            entity.HasIndex(auditCommand => auditCommand.Date);
            entity.HasIndex(auditCommand => auditCommand.UserId);
            entity.HasIndex(auditCommand => auditCommand.ImpersonatedUserId);
        }
    }
}