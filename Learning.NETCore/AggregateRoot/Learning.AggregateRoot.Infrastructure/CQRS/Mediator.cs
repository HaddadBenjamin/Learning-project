using System;
using System.Linq;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;
using Learning.AggregateRoot.Infrastructure.Example.DbContext;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace Learning.AggregateRoot.Infrastructure.CQRS
{
    public class Mediator : IMediator, IDisposable
    {
        private readonly YourDbContext _dbContext;
        private readonly IAuthentificationContext _authentificationContext;
        private readonly MediatR.IMediator _mediator;
        private readonly IServiceScope _serviceScope;

        public Mediator(IServiceScopeFactory serviceScopeFactory, YourDbContext dbContext, IAuthentificationContext authentificationContext)
        {
            _dbContext = dbContext;
            _authentificationContext = authentificationContext;
            _serviceScope = serviceScopeFactory.CreateScope();
            _mediator = _serviceScope.ServiceProvider.GetRequiredService<MediatR.IMediator>();
        }

        // Tu peux maintenant t'amuser à étendre son comportement (audit / log / et autre).
        public async Task SendCommand(ICommand command)
        {
            _mediator.Send(command);

            var auditCommand = new AuditCommand
            {
                Id = Guid.NewGuid(),
                AggregateRootName = command.GetType().GenericTypeArguments.First().Name,
                Command = JsonConvert.SerializeObject(command, Formatting.Indented),
                CommandName = command.GetType().BaseType.Name,
                Date = DateTime.UtcNow,
                CorrelationId = _authentificationContext.CorrelationId
            };

            _dbContext.AuditCommands.Add(auditCommand);
        }

        public async Task PublishEvent(IEvent @event)
        {
            _mediator.Publish(@event);

            var auditEvent = new AuditEvent
            {
                Id = Guid.NewGuid(),
                Event = JsonConvert.SerializeObject(@event, Formatting.Indented),
                EventName = @event.GetType().BaseType.Name,
                Date = DateTime.UtcNow,
                CorrelationId = _authentificationContext.CorrelationId
            };

            _dbContext.AuditEvents.Add(auditEvent);
        }

        public void Dispose() => _serviceScope.Dispose();
    }
}