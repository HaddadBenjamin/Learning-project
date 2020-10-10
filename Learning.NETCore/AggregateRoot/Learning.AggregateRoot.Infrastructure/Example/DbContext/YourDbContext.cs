using Learning.AggregateRoot.Domain.Example.Aggregate;
using Learning.AggregateRoot.Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;

namespace Learning.AggregateRoot.Infrastructure.Example.DbContext
{
    public class YourDbContext : AuditDbContext<YourDbContext>
    {
        public DbSet<Item> Items { get; set; }

        public YourDbContext(DbContextOptions<YourDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            new ItemMapper().Map(modelBuilder);
            new ItemLocationMapper().Map(modelBuilder);
        }
    }
}
