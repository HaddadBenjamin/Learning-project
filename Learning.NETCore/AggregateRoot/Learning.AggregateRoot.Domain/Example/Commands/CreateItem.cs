using System.Collections.Generic;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;

namespace Learning.AggregateRoot.Domain.Example.Commands
{
    public class CreateItem : ICommand
    {
        public string Name { get; set; }

        public IEnumerable<string> Locations { get; set; }
    }
}