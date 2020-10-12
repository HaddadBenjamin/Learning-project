using System;
using Learning.AggregateRoot.Domain.Audit.Commands;
using Learning.AggregateRoot.Domain.AuthentificationContext.Interfaces;
using Newtonsoft.Json;

namespace Learning.AggregateRoot.Domain.Audit.Aggregates
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

        public AuditCommand Create(CreateAuditCommand command, IAuthentificationContext authentificationContext)
        {
            Id = Guid.NewGuid();
            CommandName = command.Command.GetType().UnderlyingSystemType.Name;
            Command = JsonConvert.SerializeObject(command.Command, Formatting.Indented);
            CorrelationId = authentificationContext.CorrelationId;
            Date = DateTime.UtcNow;
            ImpersonatedUserId = authentificationContext.ImpersonatedUser.Id;
            UserId = authentificationContext.User.Id;

            return this;
        }
    }
}