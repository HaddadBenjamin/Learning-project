using System;
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

        public Mediator(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScope = serviceScopeFactory.CreateScope();
            _mediator = _serviceScope.ServiceProvider.GetRequiredService<MediatR.IMediator>();
            _authentificationContext = _serviceScope.ServiceProvider.GetRequiredService<IAuthentificationContext>();
            _dbContext = _serviceScope.ServiceProvider.GetRequiredService<YourDbContext>();
        }

        public async Task SendCommand(ICommand command)
        {
            _mediator.Send(command);

            var auditCommand = new AuditCommand
            {
                Id = Guid.NewGuid(),
                CommandName = command.GetType().UnderlyingSystemType.Name,
                Command = JsonConvert.SerializeObject(command, Formatting.Indented),
                CorrelationId = _authentificationContext.CorrelationId,
                Date = DateTime.UtcNow,
                ImpersonatedUserId = _authentificationContext.ImpersonatedUser.Id,
                UserId = _authentificationContext.User.Id
            };

            _dbContext.AuditCommands.Add(auditCommand);
        }

        public async Task PublishEvent(IEvent @event)
        {
            _mediator.Publish(@event);

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

        public void Dispose() => _serviceScope.Dispose();
    }
}