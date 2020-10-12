using Learning.AggregateRoot.Domain.Example.Aggregates;
using Learning.AggregateRoot.Infrastructure.DbContext.Aggregate;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Learning.AggregateRoot.Infrastructure.Example.DbContext
{
    public class ItemMapper : AggregateRootMap<Item>
    {
        protected override void Map(EntityTypeBuilder<Item> entity)
        {
            entity.Property(item => item.Name).IsRequired();

            entity.HasMany(item => item.Locations)
                .WithOne()
                .HasForeignKey(location => location.ItemId);
        }
    }
}