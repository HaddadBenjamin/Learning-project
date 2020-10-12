using System;
using MediatR;

namespace Learning.AggregateRoot.Domain.CQRS.Interfaces
{
    public interface IEvent : INotification
    {
        Guid Id { get; set; }
        Guid CorrelationId { get; set; }
        int Version { get; set; }
        DateTime Date { get; set; }
    }
}