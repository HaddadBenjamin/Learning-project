using System;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;
using Learning.AggregateRoot.Domain.ExampleToDelete.Views;

namespace Learning.AggregateRoot.Domain.ExampleToDelete.Queries
{
    public class GetItem : IQuery<ItemView>
    {
        public Guid Id { get; set; }
    }
}