using System;

namespace Learning.AggregateRoot.Domain.Audit
{
    /// <summary>
    /// Permet d'auditer toutes les changements qui ont été réalisées à votre base de données.
    /// </summary>
    public class AuditDatabaseChange
    {
        public Guid Id { get; set; }
        public string TableName { get; set; }
        public Guid AggregateRootId { get; set; }
        public Guid EntityId { get; set; }
        public string Action { get; set; }
        public string Delta { get; set; }
        public Guid CorrelationId { get; set; }
        public DateTime Date { get; set; }
        public Guid UserId { get; set; }
        public Guid ImpersonatedUserId { get; set; }
    }
}