using System;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;

namespace Learning.AggregateRoot.Domain.Example.Commands
{
    public class DeleteItem : ICommand
    {
        public Guid Id { get; set; }
    }
}