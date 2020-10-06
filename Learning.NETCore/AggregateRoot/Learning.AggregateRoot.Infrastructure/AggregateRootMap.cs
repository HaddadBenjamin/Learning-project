using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Learning.AggregateRoot.Infrastructure
{
    public abstract class AggregateRootMap<TAggregate> where TAggregate : Domain.AggregateRoot
    {
        public void Map(ModelBuilder modelBuilder)
        {
            var entity = modelBuilder.Entity<TAggregate>();

            entity.HasKey(aggregate => aggregate.Id);
            entity.Property(aggregate => aggregate.Id).IsConcurrencyToken();
            entity.HasIndex(aggregate => aggregate.Id);

            Map(entity);
        }

        protected abstract void Map(EntityTypeBuilder<TAggregate> entity);
    }
}