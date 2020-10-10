using System;
using Learning.AggregateRoot.Domain.Example.Views;

namespace Learning.AggregateRoot.Domain.Example.Readers
{
    public interface IItemReader
    {
        ItemView Get(Guid id);
    }
}
