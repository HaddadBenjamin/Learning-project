using System;

namespace Learning.AggregateRoot.Domain.Example.Aggregate
{
    public class ItemLocation
    {
        public Guid Id { get; set; }
        public Guid ItemId { get; set; }
        public string Name { get; set; }
    }
}