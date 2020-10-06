using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;

namespace Learning.AggregateRoot.Infrastructure
{
    public class Mediator : IMediator
    {
        private readonly MediatR.IMediator _mediator;

        public Mediator(MediatR.IMediator mediator) => _mediator = mediator;

        // Tu peux maintenant t'amuser à étendre son comportement (audit / log / et autre).
        public async Task SendCommand(ICommand command) => await _mediator.Send(command);

        public async Task PublishEvent(IEvent @event) => await _mediator.Publish(@event);
    }
}