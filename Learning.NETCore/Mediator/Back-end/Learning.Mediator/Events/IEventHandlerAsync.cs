using System.Threading.Tasks;

namespace Learning.Mediator
{
    public interface IEventHandlerAsync<in TEvent> where TEvent : IEvent
    {
        Task Handle(TEvent @event);
    }
}