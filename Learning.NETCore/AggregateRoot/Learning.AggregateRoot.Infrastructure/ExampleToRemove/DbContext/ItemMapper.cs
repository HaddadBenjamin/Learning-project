using Learning.AggregateRoot.Domain.ExampleToDelete.Aggregates;
using Learning.AggregateRoot.Infrastructure.DbContext.Mappers;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Learning.AggregateRoot.Infrastructure.ExampleToRemove.DbContext
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