using System;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Interfaces.Audit;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;
using Learning.AggregateRoot.Infrastructure.Example.DbContext;
using Microsoft.Extensions.DependencyInjection;

namespace Learning.AggregateRoot.Infrastructure.CQRS
{
    public class Mediator : IMediator, IDisposable
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
            _mediator.Send(command);

            _commandAuditer.Audit(command);
        }

        public async Task PublishEvent(IEvent @event)
        {
            _mediator.Publish(@event);

            _eventAuditer.Audit(@event);
        }

        public void Dispose() => _serviceScope.Dispose();
    }
}