using Learning.AggregateRoot.Domain.Example.Aggregate;
using Microsoft.EntityFrameworkCore;

namespace Learning.AggregateRoot.Infrastructure.Example
{
    public class YourDbContext : DbContext
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