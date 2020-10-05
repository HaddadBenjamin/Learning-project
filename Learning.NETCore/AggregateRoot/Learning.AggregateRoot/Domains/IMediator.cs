using System.Threading.Tasks;

namespace Learning.AggregateRoot
{
    public interface IMediator
    {
        Task SendCommand(ICommand command);
        Task PublishEvent(IEvent @event);
    }
}