using System.Collections.Generic;
using System.Threading.Tasks;

namespace Learning.AggregateRoot.Domain.CQRS.Interfaces
{
    public interface IMediator
    {
        Task SendCommand(ICommand command);
        Task PublishEvents(IReadOnlyCollection<IEvent> events);
    }
}