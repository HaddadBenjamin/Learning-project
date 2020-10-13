using System;
using Learning.AggregateRoot.Domain.CQRS;

namespace Learning.AggregateRoot.Domain.ExampleToDelete.Events
{
    public class ItemWriteEvent : Event
    {
        public ItemWriteEvent(Guid itemId) => ItemId = itemId;

        public Guid ItemId { get; set; }
    }
}
