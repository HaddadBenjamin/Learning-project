using Learning.AggregateRoot.Domain.Audit.Aggregates;
using Learning.AggregateRoot.Infrastructure.DbContext.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Learning.AggregateRoot.Infrastructure.Audit.DbContext.Mappers
{
    public class AuditQueryMapper : AggregateMap<AuditQuery>
    {
        protected override void Map(EntityTypeBuilder<AuditQuery> entity)
        {
            entity.HasKey(auditQuery => auditQuery.Id);

            entity.Property(auditQuery => auditQuery.QueryResult).HasColumnType("text");
            entity.Property(auditQuery => auditQuery.Query).HasColumnType("text");
            entity.Property(auditQuery => auditQuery.QueryResultName).HasMaxLength(50);
            entity.Property(auditQuery => auditQuery.QueryName).HasMaxLength(50);

            entity.HasIndex(auditQuery => auditQuery.Id);
            entity.HasIndex(auditQuery => auditQuery.QueryResultName);
            entity.HasIndex(auditQuery => auditQuery.QueryName);
            entity.HasIndex(auditQuery => auditQuery.CorrelationId);
            entity.HasIndex(auditQuery => auditQuery.Date);
            entity.HasIndex(auditQuery => auditQuery.UserId);
            entity.HasIndex(auditQuery => auditQuery.ImpersonatedUserId);
        }
    }
}