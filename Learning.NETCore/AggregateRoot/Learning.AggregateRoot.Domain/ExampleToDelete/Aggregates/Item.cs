using System;
using System.Collections.Generic;
using System.Linq;
using Learning.AggregateRoot.Domain.ExampleToDelete.Commands;
using Learning.AggregateRoot.Domain.ExampleToDelete.Events;
using Learning.AggregateRoot.Domain.Extensions;

namespace Learning.AggregateRoot.Domain.ExampleToDelete.Aggregates
{
    public class Item : CQRS.AggregateRoot
    {
        public string Name { get; set; }

        public HashSet<ItemLocation> Locations { get; set; }

        public Item Create(CreateItem command)
        {
            Id = Guid.NewGuid();
            Name = command.Name;
            Locations = command.Locations.Select(l => new ItemLocation
            {
                Id = Guid.NewGuid(),
                ItemId = Id,
                Name = l
            }).ToHashSet();

            RaiseEvent(new ItemWriteEvent(Id));

            return this;
        }

        public void Update(UpdateItem command)
        {
            Name = command.Name;
            Locations = command.Locations.Select(l => new ItemLocation
            {
                Id = Guid.NewGuid(),
                ItemId = Id,
                Name = l
            }).ToHashSet();

            RaiseEvent(new ItemWriteEvent(Id));
        }

        public void Deactivate(DeleteItem command)
        {
            IsActive = false;

            RaiseEvent(new ItemWriteEvent(Id));
        }
    }
}