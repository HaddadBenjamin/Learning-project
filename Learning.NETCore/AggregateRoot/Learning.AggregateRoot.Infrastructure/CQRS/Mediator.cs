using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Interfaces.Audit;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;
using Microsoft.Extensions.DependencyInjection;

namespace Learning.AggregateRoot.Infrastructure.CQRS
{
    public class Mediator : IMediator
    {
        private readonly ICommandAuditer _commandAuditer;
        private readonly IEventAuditer _eventAuditer;
        private readonly MediatR.IMediator _mediator;
        private readonly IServiceScope _serviceScope;

        public Mediator(IServiceScopeFactory serviceScopeFactory, ICommandAuditer commandAuditer, IEventAuditer eventAuditer)
        {
            _commandAuditer = commandAuditer;
            _eventAuditer = eventAuditer;
            _serviceScope = serviceScopeFactory.CreateScope();
            _mediator = _serviceScope.ServiceProvider.GetRequiredService<MediatR.IMediator>();
        }

        public async Task SendCommand(ICommand command)
        {
            await _mediator.Send(command);

            _commandAuditer.Audit(command);
        }

        public async Task PublishEvents(IReadOnlyCollection<IEvent> events)
        {
            await Task.WhenAll(events.Select(@event => _mediator.Publish(@event)));

            await _eventAuditer.Audit(events);
        }
    }
}