using Learning.AggregateRoot.Domain.ExampleToDelete.Aggregates;
using Learning.AggregateRoot.Infrastructure.ExampleToRemove.DbContext;
using Microsoft.EntityFrameworkCore;

namespace Learning.AggregateRoot.Infrastructure.ExampleToRedefine.DbContext
{
    public class YourDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbSet<Item> Items { get; set; }

        public YourDbContext(DbContextOptions<YourDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            new ItemMapper().Map(modelBuilder);
            new ItemLocationMapper().Map(modelBuilder);
        }
    }
}
