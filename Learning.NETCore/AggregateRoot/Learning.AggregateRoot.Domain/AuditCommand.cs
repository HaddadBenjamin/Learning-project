using System;

namespace Learning.AggregateRoot.Domain
{
    /// <summary>
    /// Permet d'auditer toutes les commandes qui ont été réalisées à votre base de données.
    /// </summary>
    public class AuditCommand
    {
        public Guid Id { get; set; }
        public string CommandName { get; set; }
        public string AggregateRootName { get; set; }
        public string Command { get; set; }
        public Guid CorrelationId { get; set; }
        public DateTime Date { get; set; }
    }
}