using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Audit.Commands;
using Learning.AggregateRoot.Domain.Audit.Configuration;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Learning.AggregateRoot.Infrastructure.CQRS
{
    public class Mediator : IMediator
    {
        private readonly AuditConfiguration _auditConfiguration;
        private readonly MediatR.IMediator _mediator;
        private readonly IServiceScope _serviceScope;

        public Mediator(IServiceScopeFactory serviceScopeFactory, AuditConfiguration auditConfiguration)
        {
            _auditConfiguration = auditConfiguration;
            _serviceScope = serviceScopeFactory.CreateScope();
            _mediator = _serviceScope.ServiceProvider.GetRequiredService<MediatR.IMediator>();
        }

        public async Task SendCommand(ICommand command)
        {
            await _mediator.Send(command);

            if (_auditConfiguration.AuditCommand)
                await _mediator.Send(new CreateAuditCommand { Command = command });
        }

        public async Task PublishEvents(IReadOnlyCollection<IEvent> events)
        {
            await Task.WhenAll(events.Select(@event => _mediator.Publish(@event)));

            if (_auditConfiguration.AuditEvent)
                await _mediator.Send(new CreateAuditEvents { Events = events });
        }
    }
}