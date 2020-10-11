using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EFCore.BulkExtensions;
using Learning.AggregateRoot.Domain.Audit;
using Learning.AggregateRoot.Domain.Interfaces.Audit;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;
using Learning.AggregateRoot.Infrastructure.DbContext.Audit;
using Newtonsoft.Json;

namespace Learning.AggregateRoot.Infrastructure.Audit
{
    public class EventAuditer : IEventAuditer
    {
        private readonly IAuthentificationContext _authentificationContext;
        private readonly AuditDbContext _dbContext;

        public EventAuditer(IAuthentificationContext authentificationContext, AuditDbContext auditDbContext)
        {
            _authentificationContext = authentificationContext;
            _dbContext = auditDbContext;
        }

        public async Task Audit(IReadOnlyCollection<IEvent> events)
        {
            var auditEvents = events.Select(ToAuditEvent).ToList();

            await _dbContext.BulkInsertAsync(auditEvents);
            await _dbContext.SaveChangesAsync();
        }

        private AuditEvent ToAuditEvent(IEvent @event) => new AuditEvent
        {
            Id = Guid.NewGuid(),
            EventName = @event.GetType().UnderlyingSystemType.Name,
            Event = JsonConvert.SerializeObject(@event, Formatting.Indented),
            CorrelationId = _authentificationContext.CorrelationId,
            Date = DateTime.UtcNow,
            ImpersonatedUserId = _authentificationContext.ImpersonatedUser.Id,
            UserId = _authentificationContext.User.Id
        };

    }
}