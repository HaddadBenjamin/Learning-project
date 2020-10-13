using System;
using System.Collections.Generic;
using System.Linq;
using Learning.AggregateRoot.Domain.Audit.Commands;
using Learning.AggregateRoot.Domain.Audit.Services;
using Learning.AggregateRoot.Domain.AuthentificationContext;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;

namespace Learning.AggregateRoot.Domain.Audit.Aggregates
{
    /// <summary>
    /// Permet d'auditer toutes les évènements envoyés par votre Médiateur.
    /// </summary>
    public class AuditEvent
    {
        public Guid Id { get; set; }
        public string EventName { get; set; }
        public string Event { get; set; }
        public Guid CorrelationId { get; set; }
        public DateTime Date { get; set; }
        public Guid UserId { get; set; }
        public Guid ImpersonatedUserId { get; set; }

        public static List<AuditEvent> Create(CreateAuditEvents command, IAuthentificationContext authentificationContext, IAuditSerializer auditSerializer) =>
            command.Events.Select(@event => ToAuditEvent(@event, authentificationContext, auditSerializer)).ToList();

        private static AuditEvent ToAuditEvent(IEvent @event, IAuthentificationContext authentificationContext, IAuditSerializer auditSerializer) => new AuditEvent
        {
            Id = Guid.NewGuid(),
            EventName = @event.GetType().UnderlyingSystemType.Name,
            Event = auditSerializer.Serialize(@event),
            CorrelationId = authentificationContext.CorrelationId,
            Date = DateTime.UtcNow,
            ImpersonatedUserId = authentificationContext.ImpersonatedUser.Id,
            UserId = authentificationContext.User.Id
        };
    }
}