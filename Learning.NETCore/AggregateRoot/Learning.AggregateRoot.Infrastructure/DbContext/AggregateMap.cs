using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Learning.AggregateRoot.Infrastructure.DbContext
{
    public abstract class AggregateMap<TAggregate> where TAggregate : class
    {
        public void Map(ModelBuilder modelBuilder) => Map(modelBuilder.Entity<TAggregate>());

        protected abstract void Map(EntityTypeBuilder<TAggregate> entity);
    }
}