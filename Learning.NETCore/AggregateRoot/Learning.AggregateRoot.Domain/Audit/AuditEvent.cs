using System;

namespace Learning.AggregateRoot.Domain.Audit
{
    /// <summary>
    /// Permet d'auditer tout les évènements qui ont été réalisées à votre base de données.
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
    }
}