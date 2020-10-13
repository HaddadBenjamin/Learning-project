using System;
using Learning.AggregateRoot.Domain.ExampleToDelete.Views;

namespace Learning.AggregateRoot.Domain.ExampleToDelete.Readers
{
    public interface IItemReader
    {
        ItemView Get(Guid id);
    }
}
