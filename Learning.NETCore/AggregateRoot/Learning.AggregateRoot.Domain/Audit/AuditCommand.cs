﻿using System;

namespace Learning.AggregateRoot.Domain.Audit
{
    /// <summary>
    /// Permet d'auditer toutes les commandes envoyées par votre Médiateur.
    /// </summary>
    public class AuditCommand
    {
        public Guid Id { get; set; }
        public string CommandName { get; set; }
        public string Command { get; set; }
        public Guid CorrelationId { get; set; }
        public DateTime Date { get; set; }
        public Guid UserId { get; set; }
        public Guid ImpersonatedUserId { get; set; }
    }
}