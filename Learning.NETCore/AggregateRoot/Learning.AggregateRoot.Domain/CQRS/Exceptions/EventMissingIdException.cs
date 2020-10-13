using System;

namespace Learning.AggregateRoot.Domain.CQRS.Exceptions
{
    public class EventMissingIdException : Exception
    {
        public EventMissingIdException(Type aggregateType, Type eventType) :
            base($"The event {eventType.FullName} don't have an id and come from the aggregate {aggregateType.Name}")
        { }
    }
}