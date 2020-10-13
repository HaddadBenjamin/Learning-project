using System;
using Learning.AggregateRoot.Domain.Audit.Commands;
using Learning.AggregateRoot.Domain.Audit.Services;
using Learning.AggregateRoot.Domain.AuthentificationContext;

namespace Learning.AggregateRoot.Domain.Audit.Aggregates
{
    /// <summary>
    /// Permet d'auditer toutes les queries envoyées par votre Médiateur.
    /// </summary>
    public class AuditQuery
    {
        public Guid Id { get; set; }
        public string QueryName { get; set; }
        public string Query { get; set; }
        public string QueryResultName { get; set; }
        public string QueryResult { get; set; }
        public Guid CorrelationId { get; set; }
        public DateTime Date { get; set; }
        public Guid UserId { get; set; }
        public Guid ImpersonatedUserId { get; set; }

        public static AuditQuery Create(CreateAuditQuery query, IAuthentificationContext authentificationContext, IAuditSerializer auditSerializer) => new AuditQuery
        {
            Id = Guid.NewGuid(),
            QueryName = query.Query.GetType().UnderlyingSystemType.Name,
            Query = auditSerializer.Serialize(query.Query),
            QueryResultName = query.QueryResult.GetType().UnderlyingSystemType.Name,
            QueryResult = auditSerializer.Serialize(query.QueryResult),
            CorrelationId = authentificationContext.CorrelationId,
            Date = DateTime.UtcNow,
            ImpersonatedUserId = authentificationContext.ImpersonatedUser.Id,
            UserId = authentificationContext.User.Id
        };
    }
}