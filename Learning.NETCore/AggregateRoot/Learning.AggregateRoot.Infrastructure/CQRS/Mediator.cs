using System;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;
using Microsoft.Extensions.DependencyInjection;

namespace Learning.AggregateRoot.Infrastructure.CQRS
{
    public class Mediator : IMediator, IDisposable
    {
        private readonly MediatR.IMediator _mediator;
        private readonly IServiceScope _serviceScope;

        public Mediator(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScope = serviceScopeFactory.CreateScope();
            _mediator = _serviceScope.ServiceProvider.GetRequiredService<MediatR.IMediator>();
        }

        // Tu peux maintenant t'amuser à étendre son comportement (audit / log / et autre).
        public async Task SendCommand(ICommand command) => _mediator.Send(command);

        public async Task PublishEvent(IEvent @event) => _mediator.Publish(@event);

        public void Dispose() => _serviceScope.Dispose();
    }
}