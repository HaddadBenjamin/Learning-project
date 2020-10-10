using Learning.AggregateRoot.Domain;
using Microsoft.EntityFrameworkCore;

namespace Learning.AggregateRoot.Infrastructure.DbContext
{
    public class AuditDbContext<TDbContext> : Microsoft.EntityFrameworkCore.DbContext
        where TDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbSet<AuditCommand> AuditCommands { get; set; }
        public DbSet<AuditEvent> AuditEvents { get; set; }

        public AuditDbContext(DbContextOptions<TDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            new AuditCommandMapper().Map(modelBuilder);
            new AuditEventMapper().Map(modelBuilder);
        }
    }
}