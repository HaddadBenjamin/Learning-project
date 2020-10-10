using Learning.AggregateRoot.Domain;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Learning.AggregateRoot.Infrastructure.DbContext
{
    public class AuditCommandMapper : AggregateMap<AuditCommand>
    {
        protected override void Map(EntityTypeBuilder<AuditCommand> entity)
        {
            entity.HasKey(auditCommand => auditCommand.Id);

            entity.HasIndex(auditCommand => auditCommand.Id);
            entity.HasIndex(auditCommand => auditCommand.AggregateRootName);
            entity.HasIndex(auditCommand => auditCommand.CommandName);
            entity.HasIndex(auditCommand => auditCommand.Command);
            entity.HasIndex(auditCommand => auditCommand.CorrelationId);
            entity.HasIndex(auditCommand => auditCommand.Date);
            entity.HasIndex(auditCommand => auditCommand.UserId);
            entity.HasIndex(auditCommand => auditCommand.ImpersonatedUserId);
        }
    }
}