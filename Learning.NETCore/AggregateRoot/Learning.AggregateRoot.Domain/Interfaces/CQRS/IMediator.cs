using System.Collections.Generic;
using System.Threading.Tasks;

namespace Learning.AggregateRoot.Domain.Interfaces.CQRS
{
    public interface IMediator
    {
        Task SendCommand(ICommand command);
        Task PublishEvents(IReadOnlyCollection<IEvent> events);
    }
}