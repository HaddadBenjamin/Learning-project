using Learning.AggregateRoot.Domain.Example.Aggregate;
using Microsoft.EntityFrameworkCore;

namespace Learning.AggregateRoot.Infrastructure.Example
{
    public class YourDbContext : DbContext
    {
        public DbSet<Item> Items { get; set; }
    }
}