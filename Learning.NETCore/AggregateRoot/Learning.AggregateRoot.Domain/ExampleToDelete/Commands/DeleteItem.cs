using System;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;

namespace Learning.AggregateRoot.Domain.ExampleToDelete.Commands
{
    public class DeleteItem : ICommand
    {
        public Guid Id { get; set; }
    }
}