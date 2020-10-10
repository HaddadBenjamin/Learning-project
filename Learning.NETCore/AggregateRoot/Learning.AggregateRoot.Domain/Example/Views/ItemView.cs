using System;
using System.Collections.Generic;
using System.Text;
using Learning.AggregateRoot.Domain.Example.Aggregate;

namespace Learning.AggregateRoot.Domain.Example.Views
{
    public class ItemView
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<ItemLocationView> Locations { get; set; }
    }
}
