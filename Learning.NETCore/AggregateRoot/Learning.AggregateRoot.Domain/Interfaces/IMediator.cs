using System.Threading.Tasks;

namespace Learning.AggregateRoot.Domain.Interfaces
{
    public interface IMediator
    {
        Task SendCommand(ICommand command);
        Task PublishEvent(IEvent @event);
    }
}