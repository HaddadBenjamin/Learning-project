using System;

namespace Learning.AggregateRoot.Domain.ExampleToDelete.Commands
{
    public class UpdateItem : CreateItem
    {
        public Guid Id { get; set; }
    }
}