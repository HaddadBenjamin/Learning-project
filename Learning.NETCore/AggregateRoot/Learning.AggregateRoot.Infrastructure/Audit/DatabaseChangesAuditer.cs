using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Audit;
using Learning.AggregateRoot.Domain.Interfaces.Audit;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;
using Learning.AggregateRoot.Infrastructure.DbContext.Audit;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using EFCore.BulkExtensions;

namespace Learning.AggregateRoot.Infrastructure.Audit
{
    public class DatabaseChangesAuditer<TDbContext> : IDatabaseChangesAuditer
        where TDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        private readonly IAuthentificationContext _authentificationContext;
        private readonly AuditDbContext _auditDbContext;
        private readonly TDbContext _dbContextToAudit;
        private readonly string Separator;

        public DatabaseChangesAuditer(IAuthentificationContext authentificationContext, AuditDbContext auditDbContext, TDbContext dbContextToAudit)
        {
            _authentificationContext = authentificationContext;
            _dbContextToAudit = dbContextToAudit;
            _auditDbContext = auditDbContext;
            Separator = $",{Environment.NewLine}";
        }

        public async Task Audit()
        {
            var changes = _dbContextToAudit.ChangeTracker.Entries()
                .Where(change => change.State != EntityState.Unchanged)
                .ToList();
            var auditDatabaseChanges = new List<AuditDatabaseChange>();
            
            foreach (var change in changes)
            {
                var tableName = change.Entity.GetType().Name;
                var (entityId, aggregateRootId) = GetIds(change);
                var writeAction = GetWriteAction(change.State);

                if (change.State == EntityState.Added)
                {
                    var delta = string.Join(Separator, change.OriginalValues.Properties.Select(property => $"{property.PropertyInfo.Name} : {change.OriginalValues[property]}"));

                    auditDatabaseChanges.Add(ToAuditDatabaseChange(tableName, entityId, aggregateRootId, writeAction, delta));
                }

                else if (change.State == EntityState.Modified)
                {
                    var delta = string.Join(Separator, change.OriginalValues.Properties
                        .Where(property => change.OriginalValues[property].ToString() != change.CurrentValues[property].ToString())
                        .Select(property => $"{property.PropertyInfo.Name} : {change.CurrentValues[property]}"));

                    auditDatabaseChanges.Add(ToAuditDatabaseChange(tableName, entityId, aggregateRootId, writeAction, delta));
                }

                else if(change.State == EntityState.Deleted)
                    auditDatabaseChanges.Add(ToAuditDatabaseChange(tableName, entityId, aggregateRootId, writeAction, null));
            }

            auditDatabaseChanges = auditDatabaseChanges.ToLookup(a => a.AggregateRootId).Select(group =>
            {
                var aggregateRootId = group.First().AggregateRootId;
                var aggregateRoot = group.First(_ => _.EntityId == aggregateRootId);
                var aggregates = group
                    .Where(_ => _.Id != aggregateRoot.Id)
                    .OrderBy(_ => _.TableName)
                    .ThenBy(_ =>
                        _.WriteAction == "Deleted" ? 1 :
                        _.WriteAction == "Created" ? 2 :
                        3
                    );

                if (aggregates.Any())
                    aggregateRoot.Delta += Separator + string.Join(Separator, aggregates.Select(_ => $"{_.TableName} {_.WriteAction} with id {_.EntityId}" + (_.WriteAction != "Deleted" ? Separator : string.Empty) +_.Delta));

                return aggregateRoot;
            }).ToList();

            await _auditDbContext.BulkInsertAsync(auditDatabaseChanges);
            await _auditDbContext.SaveChangesAsync();
        }

        private (Guid entityId, Guid aggregateRootId) GetIds(EntityEntry entityEntry)
        {
            var properties = entityEntry.CurrentValues.Properties;
            var property = properties.FirstOrDefault(p => p.PropertyInfo.Name == "Id") ?? properties.First(p => p.IsPrimaryKey());
            var entityId = Guid.Parse(entityEntry.CurrentValues[property].ToString());
            var propertyAggregateRootId = properties.FirstOrDefault(p => p.PropertyInfo.PropertyType.GUID != entityId);
            var aggregateRootId = Guid.Parse(entityEntry.CurrentValues[propertyAggregateRootId].ToString());

            return (entityId, aggregateRootId);
        }

        private string GetWriteAction(EntityState entityState) =>
            entityState == EntityState.Added ? "Created" :
            entityState == EntityState.Modified ? "Updated" :
            entityState.ToString();

        private AuditDatabaseChange ToAuditDatabaseChange(string tableName, Guid entityId, Guid aggregateRootId, string writeAction, string delta) => new AuditDatabaseChange
        {
            Id = Guid.NewGuid(),
            EntityId = entityId,
            AggregateRootId = aggregateRootId,
            WriteAction = writeAction,
            TableName = tableName,
            Delta = delta,
            CorrelationId = _authentificationContext.CorrelationId,
            Date = DateTime.UtcNow,
            ImpersonatedUserId = _authentificationContext.ImpersonatedUser.Id,
            UserId = _authentificationContext.User.Id,
        };
    }
}