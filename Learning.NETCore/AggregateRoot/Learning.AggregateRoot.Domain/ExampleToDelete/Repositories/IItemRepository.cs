using Learning.AggregateRoot.Domain.CQRS.Interfaces;
using Learning.AggregateRoot.Domain.ExampleToDelete.Aggregates;

namespace Learning.AggregateRoot.Domain.ExampleToDelete.Repositories
{
    public interface IItemRepository : IRepository<Item>
    {
        Item GetByName(string name);
    }
}