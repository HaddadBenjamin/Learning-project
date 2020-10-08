using System;

namespace Learning.AggregateRoot.Domain.Exceptions
{
    public class AggregateNotFoundException : Exception
    {
        public AggregateNotFoundException(Guid id) : base($"Aggregate with id {id} not found") { }
    }
}