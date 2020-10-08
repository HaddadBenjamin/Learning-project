using System;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;

namespace Learning.AggregateRoot.Domain.Example.Commands
{
    public class DeleteItem : ICommand
    {
        public Guid Id { get; set; }
    }
}