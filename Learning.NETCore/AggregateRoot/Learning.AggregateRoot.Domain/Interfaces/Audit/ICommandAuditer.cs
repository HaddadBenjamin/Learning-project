using Learning.AggregateRoot.Domain.Interfaces.CQRS;

namespace Learning.AggregateRoot.Domain.Interfaces.Audit
{
    public interface ICommandAuditer
    {
        void Audit(ICommand command);
    }
}