using System;
using System.Linq;
using System.Threading.Tasks;
using Learning.AggregateRoot.Infrastructure.DbContext.Audit;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using EFCore.BulkExtensions;
using Learning.AggregateRoot.Domain.Audit.Aggregates;
using Learning.AggregateRoot.Domain.Audit.Attributes;
using Learning.AggregateRoot.Domain.Audit.Services;
using Learning.AggregateRoot.Domain.AuthentificationContext.Interfaces;

namespace Learning.AggregateRoot.Infrastructure.Audit
{
    public class DatabaseChangesAuditService<TDbContext> : IDatabaseChangesAuditService
        where TDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        private readonly IAuthentificationContext _authentificationContext;
        private readonly AuditDbContext _auditDbContext;
        private readonly TDbContext _dbContextToAudit;
        private readonly IAuditSerializer _auditSerializer;


        public DatabaseChangesAuditService(IAuthentificationContext authentificationContext, AuditDbContext auditDbContext, TDbContext dbContextToAudit, IAuditSerializer auditSerializer)
        {
            _authentificationContext = authentificationContext;
            _dbContextToAudit = dbContextToAudit;
            _auditSerializer = auditSerializer;
            _auditDbContext = auditDbContext;
        }

        public async Task Audit()
        {
            var auditDatabaseChanges = _dbContextToAudit.ChangeTracker.Entries()
                .Where(entry => entry.Metadata.ClrType.ShouldAudit())
                .Select(entry =>
                {
                    if (new[] {EntityState.Added, EntityState.Deleted}.Contains(entry.State))
                    {
                        var changes = entry.Properties
                            .Where(property => property.IsTemporary || property.Metadata.PropertyInfo.ShouldAudit())
                            .ToDictionary(property => property.Metadata.Name, property => entry.State == EntityState.Deleted ? property.OriginalValue : property.CurrentValue);

                        return BuildAuditDatabaseChange(entry, changes);
                    }
                    if (entry.State == EntityState.Modified)
                    {
                        var propertiesToAudit = entry.Properties.Where(property => property.IsModified && property.Metadata.PropertyInfo.ShouldAudit()).ToList();
                        var changes = new
                        {
                            PreviousState = propertiesToAudit.ToDictionary(property => property.Metadata.Name, property => property.OriginalValue),
                            NewState = propertiesToAudit.ToDictionary(property => property.Metadata.Name, property => property.CurrentValue),
                        };
                     
                        return BuildAuditDatabaseChange(entry, changes);
                    }

                    return null;
                })
                .Where(auditDatabaseChange => auditDatabaseChange != null)
                .ToList();

            await _auditDbContext.BulkInsertAsync(auditDatabaseChanges);
            await _auditDbContext.SaveChangesAsync();
        }


        private AuditDatabaseChange BuildAuditDatabaseChange(EntityEntry change, object delta) => new AuditDatabaseChange
        {
            Id = Guid.NewGuid(),
            EntityId = GetEntityId(change),
            WriteAction = GetWriteAction(change.State),
            TableName = change.Entity.GetType().Name,
            Changes = _auditSerializer.Serialize(delta),
            CorrelationId = _authentificationContext.CorrelationId,
            Date = DateTime.UtcNow,
            ImpersonatedUserId = _authentificationContext.ImpersonatedUser.Id,
            UserId = _authentificationContext.User.Id,
        };

        private string GetEntityId(EntityEntry change)
        {
            var aggregateRootId = (change.Entity as Domain.CQRS.AggregateRoot)?.Id.ToString();
            if (aggregateRootId != null)
                return aggregateRootId;

            var keyProperties = change.Properties
                .Where(property => property.Metadata.IsKey())
                .ToDictionary(property => property.Metadata.Name, property => change.State == EntityState.Deleted ? property.OriginalValue : property.CurrentValue);

            return keyProperties.Values.Count() == 1 ? keyProperties.Values.First().ToString() : _auditSerializer.Serialize(keyProperties);
        }

        private static string GetWriteAction(EntityState entityState) =>
            entityState == EntityState.Added ? "Created" :
            entityState == EntityState.Modified ? "Updated" :
            entityState.ToString();
    }
}