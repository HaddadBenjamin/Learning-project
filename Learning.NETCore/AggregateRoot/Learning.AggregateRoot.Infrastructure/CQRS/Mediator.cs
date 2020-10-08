using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;
using Microsoft.Extensions.DependencyInjection;

namespace Learning.AggregateRoot.Infrastructure.CQRS
{
    public class Mediator : IMediator
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly MediatR.IMediator _mediator;

        public Mediator(IServiceScopeFactory serviceScopeFactory) => _serviceScopeFactory = serviceScopeFactory;

        // Tu peux maintenant t'amuser à étendre son comportement (audit / log / et autre).
        public async Task SendCommand(ICommand command)
        {
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var mediator = scope.ServiceProvider.GetRequiredService<MediatR.IMediator>();

                mediator.Send(command);
            }
        }

        public async Task PublishEvent(IEvent @event)
        {
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var mediator = scope.ServiceProvider.GetRequiredService<MediatR.IMediator>();

                mediator.Publish(@event);
            }
        }
    }
}