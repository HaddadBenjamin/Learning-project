using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain;
using Learning.AggregateRoot.Domain.Interfaces.Audit;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;
using Learning.AggregateRoot.Infrastructure.DbContext;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace Learning.AggregateRoot.Infrastructure.Audit
{
    public class EventAuditer : IEventAuditer
    {
        private readonly IAuthentificationContext _authentificationContext;
        private readonly AuditDbContext _dbContext;

        public EventAuditer(IAuthentificationContext authentificationContext, IServiceScopeFactory serviceScopeFactory)
        {
            _authentificationContext = authentificationContext;
            _dbContext = serviceScopeFactory.CreateScope().ServiceProvider.GetService<AuditDbContext>();
        }

        public async Task Audit(IReadOnlyCollection<IEvent> events)
        {
            foreach (var @event in events)
                _dbContext.AuditEvents.Add(ToAuditEvent(@event));
            
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