using System.Linq;
using Learning.AggregateRoot.Domain.ExampleToDelete.Aggregates;
using Learning.AggregateRoot.Domain.ExampleToDelete.Builders;
using Learning.AggregateRoot.Domain.ExampleToDelete.Views;

namespace Learning.AggregateRoot.Infrastructure.ExampleToRemove.Mappers
{
    public class ItemViewMapper : IItemViewMapper
    {
        public ItemView Map(Item item) => new ItemView
        {
            Id = item.Id,
            Name = item.Name,
            Locations = item.Locations.Select(l => new ItemLocationView
            {
                Id = l.Id,
                Name = l.Name
            })
        };
    }
}
