using Learning.AggregateRoot.Domain.Interfaces.CQRS;

namespace Learning.AggregateRoot.Domain.Interfaces.Audit
{
    public interface IEventAuditer
    {
        void Audit(IEvent @event);
    }
}