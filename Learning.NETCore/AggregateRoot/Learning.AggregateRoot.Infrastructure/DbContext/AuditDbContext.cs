using Learning.AggregateRoot.Domain;
using Learning.AggregateRoot.Domain.Audit;
using Microsoft.EntityFrameworkCore;

namespace Learning.AggregateRoot.Infrastructure.DbContext
{
    public class AuditDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbSet<AuditCommand> AuditCommands { get; set; }
        public DbSet<AuditEvent> AuditEvents { get; set; }

        public AuditDbContext(DbContextOptions<AuditDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            new AuditCommandMapper().Map(modelBuilder);
            new AuditEventMapper().Map(modelBuilder);
        }
    }
}