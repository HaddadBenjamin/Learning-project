using Learning.AggregateRoot.Domain;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Learning.AggregateRoot.Infrastructure.DbContext
{
    public class AuditEventMapper : AggregateMap<AuditEvent>
    {
        protected override void Map(EntityTypeBuilder<AuditEvent> entity)
        {
            entity.HasKey(auditEvent => auditEvent.Id);

            entity.HasIndex(auditEvent => auditEvent.Id);
            entity.HasIndex(auditEvent => auditEvent.EventName);
            entity.HasIndex(auditEvent => auditEvent.Date);
            entity.HasIndex(auditEvent => auditEvent.Event);
            entity.HasIndex(auditEvent => auditEvent.CorrelationId);
        }
    }
}