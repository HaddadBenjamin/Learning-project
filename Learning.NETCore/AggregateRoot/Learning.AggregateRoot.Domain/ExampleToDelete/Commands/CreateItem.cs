using System.Collections.Generic;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;

namespace Learning.AggregateRoot.Domain.ExampleToDelete.Commands
{
    public class CreateItem : ICommand
    {
        public string Name { get; set; }

        public IEnumerable<string> Locations { get; set; }
    }
}