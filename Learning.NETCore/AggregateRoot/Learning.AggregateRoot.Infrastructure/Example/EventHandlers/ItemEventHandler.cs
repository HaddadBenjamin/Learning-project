using System.Threading;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Example.Events;
using MediatR;

namespace Learning.AggregateRoot.Infrastructure.Example.EventHandlers
{
    public class ItemEventHandler : INotificationHandler<ItemWriteEvent>
    {
        public Task Handle(ItemWriteEvent notification, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}
