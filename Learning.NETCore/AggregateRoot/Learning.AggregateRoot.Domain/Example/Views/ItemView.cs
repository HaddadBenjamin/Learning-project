using System;
using System.Collections.Generic;

namespace Learning.AggregateRoot.Domain.Example.Views
{
    public class ItemView
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<ItemLocationView> Locations { get; set; }
    }
}
