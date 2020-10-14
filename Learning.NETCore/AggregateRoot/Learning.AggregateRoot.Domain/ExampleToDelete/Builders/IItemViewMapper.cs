using Learning.AggregateRoot.Domain.ExampleToDelete.Aggregates;
using Learning.AggregateRoot.Domain.ExampleToDelete.Views;

namespace Learning.AggregateRoot.Domain.ExampleToDelete.Builders
{
    public interface IItemViewMapper
    {
        ItemView Map(Item item);
    }
}