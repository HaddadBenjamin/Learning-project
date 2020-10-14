using Learning.AggregateRoot.Domain.CQRS.Interfaces;
using Learning.AggregateRoot.Domain.ExampleToDelete.Views;

namespace Learning.AggregateRoot.Domain.ExampleToDelete.Queries
{
    public class GetItemByName : IQuery<ItemView>
    {
        public string Name { get; set; }
    }
}