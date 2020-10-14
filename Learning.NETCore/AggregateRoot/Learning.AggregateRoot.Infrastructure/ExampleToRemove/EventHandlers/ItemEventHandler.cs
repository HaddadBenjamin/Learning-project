using System.Threading;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.ExampleToDelete.Events;
using MediatR;

namespace Learning.AggregateRoot.Infrastructure.ExampleToRemove.EventHandlers
{
    public class ItemEventHandler : INotificationHandler<ItemWriteEvent>
    {
        public async Task Handle(ItemWriteEvent notification, CancellationToken cancellationToken) => await Task.CompletedTask;
    }
}
