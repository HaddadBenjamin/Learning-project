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
                var entityId = GetEntityId(change);
                var action = change.State.ToString();

                if (change.State == EntityState.Added)
                {
                    var delta = string.Join(Separator, change.OriginalValues.Properties.Select(property => $"{property.PropertyInfo.Name} :  {change.OriginalValues[property]}"));

                    auditDatabaseChanges.Add(ToAuditDatabaseChange(tableName, entityId, action, delta));
                }

                else if (change.State == EntityState.Modified)
                {
                    var delta = string.Join(Separator, change.OriginalValues.Properties
                        .Where(property => change.OriginalValues[property].ToString() != change.CurrentValues[property].ToString())
                        .Select(property => $"{property.PropertyInfo.Name} :  {change.CurrentValues[property]}"));

                    auditDatabaseChanges.Add(ToAuditDatabaseChange(tableName, entityId, action, delta));
                }

                else if(change.State == EntityState.Deleted)
                    auditDatabaseChanges.Add(ToAuditDatabaseChange(tableName, entityId, action, null));
            }

            foreach (var auditDatabaseChange in auditDatabaseChanges)
                _auditDbContext.Add(auditDatabaseChange);

            await _auditDbContext.BulkInsertAsync(auditDatabaseChanges);
        }

        private Guid GetEntityId(EntityEntry entityEntry)
        {
            var properties = entityEntry.OriginalValues.Properties;
            var property = properties.FirstOrDefault(p => p.PropertyInfo.Name == "Id") ??
                           properties.First(p => p.IsPrimaryKey());

            return property.PropertyInfo.PropertyType.GUID;
        }

        private AuditDatabaseChange ToAuditDatabaseChange(string tableName, Guid entityId, string action, string delta) => new AuditDatabaseChange
        {
            EntityId = entityId,
            Id = Guid.NewGuid(),
            Action = action,
            TableName = tableName,
            Delta = delta,
            CorrelationId = _authentificationContext.CorrelationId,
            Date = DateTime.UtcNow,
            ImpersonatedUserId = _authentificationContext.ImpersonatedUser.Id,
            UserId = _authentificationContext.User.Id,
        };
    }
}