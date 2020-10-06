﻿using System;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;

namespace Learning.AggregateRoot.Domain
{
    public class Event : IEvent
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid CorrelationId { get; set; }
        public int Version { get; set; }
        public DateTime Date { get; set; }
    }
}