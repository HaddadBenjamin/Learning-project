using Learning.AggregateRoot.Domain.Audit.Aggregates;
using Learning.AggregateRoot.Infrastructure.DbContext.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Learning.AggregateRoot.Infrastructure.Audit.DbContext.Audit
{
    public class AuditCommandMapper : AggregateMap<AuditCommand>
    {
        protected override void Map(EntityTypeBuilder<AuditCommand> entity)
        {
            entity.HasKey(auditCommand => auditCommand.Id);

            entity.Property(auditCommand => auditCommand.Command).HasColumnType("text");
            entity.Property(auditCommand => auditCommand.CommandName).HasMaxLength(50);

            entity.HasIndex(auditCommand => auditCommand.Id);
            entity.HasIndex(auditCommand => auditCommand.CommandName);
            entity.HasIndex(auditCommand => auditCommand.CorrelationId);
            entity.HasIndex(auditCommand => auditCommand.Date);
            entity.HasIndex(auditCommand => auditCommand.UserId);
            entity.HasIndex(auditCommand => auditCommand.ImpersonatedUserId);
        }
    }
}