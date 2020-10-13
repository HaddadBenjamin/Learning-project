using System;

namespace Learning.AggregateRoot.Domain.CQRS.Exceptions
{
    public class AggregateMissingIdException : Exception
    {
        public AggregateMissingIdException(Type type) : base($"The aggregate {type.FullName} don't have an id") { }
    }
}