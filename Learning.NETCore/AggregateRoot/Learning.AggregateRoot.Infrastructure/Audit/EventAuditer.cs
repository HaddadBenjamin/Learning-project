using System;
using Learning.AggregateRoot.Domain;
using Learning.AggregateRoot.Domain.Interfaces.Audit;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;
using Learning.AggregateRoot.Infrastructure.Example.DbContext;
using Newtonsoft.Json;

namespace Learning.AggregateRoot.Infrastructure.Audit
{
    public class EventAuditer : IEventAuditer
    {
        private readonly IAuthentificationContext _authentificationContext;
        private readonly YourDbContext _dbContext;

        public EventAuditer(IAuthentificationContext authentificationContext, YourDbContext dbContext)
        {
            _authentificationContext = authentificationContext;
            _dbContext = dbContext;
        }

        public void Audit(IEvent @event)
        {
            var auditEvent = new AuditEvent
            {
                Id = Guid.NewGuid(),
                EventName = @event.GetType().UnderlyingSystemType.Name,
                Event = JsonConvert.SerializeObject(@event, Formatting.Indented),
                CorrelationId = _authentificationContext.CorrelationId,
                Date = DateTime.UtcNow,
                ImpersonatedUserId = _authentificationContext.ImpersonatedUser.Id,
                UserId = _authentificationContext.User.Id
            };

            _dbContext.AuditEvents.Add(auditEvent);
        }
    }
}