using System;

namespace Learning.AggregateRoot.Domain.Example.Commands
{
    public class UpdateItem : CreateItem
    {
        public Guid Id { get; set; }
    }
}