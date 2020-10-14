using System.Collections.Generic;
using System.Threading.Tasks;

namespace Learning.AggregateRoot.Domain.CQRS.Interfaces
{
    public interface IMediator
    {
        Task SendCommand(ICommand command);
        Task<TQueryResult> SendQuery<TQueryResult>(IQuery<TQueryResult> query);
        Task PublishEvents(IReadOnlyCollection<IEvent> events);
    }
}