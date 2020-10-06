using Learning.AggregateRoot.Domain.Example.Aggregate;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Learning.AggregateRoot.Infrastructure.Example
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