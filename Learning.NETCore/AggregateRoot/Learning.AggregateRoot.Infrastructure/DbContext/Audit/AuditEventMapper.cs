using Learning.AggregateRoot.Domain.Audit;
using Learning.AggregateRoot.Infrastructure.DbContext.Aggregate;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Learning.AggregateRoot.Infrastructure.DbContext.Audit
{
    public class AuditEventMapper : AggregateMap<AuditEvent>
    {
        protected override void Map(EntityTypeBuilder<AuditEvent> entity)
        {
            entity.HasKey(auditEvent => auditEvent.Id);

            entity.HasIndex(auditEvent => auditEvent.Id);
            entity.HasIndex(auditEvent => auditEvent.EventName);
            entity.HasIndex(auditEvent => auditEvent.Event);
            entity.HasIndex(auditEvent => auditEvent.CorrelationId);
            entity.HasIndex(auditCommand => auditCommand.Date);
            entity.HasIndex(auditCommand => auditCommand.UserId);
            entity.HasIndex(auditCommand => auditCommand.ImpersonatedUserId);
        }
    }
}