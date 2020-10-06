using System;

namespace Learning.AggregateRoot.Domain.Example.Events
{
    public class ItemWriteEvent : Event
    {
        public ItemWriteEvent(Guid itemId) => ItemId = itemId;

        public Guid ItemId { get; set; }
    }
}
