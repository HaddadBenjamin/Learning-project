using Learning.AggregateRoot.Domain.CQRS.Interfaces;

namespace Learning.AggregateRoot.Domain.Audit.Commands
{
    public class CreateAuditCommand : ICommand
    {
        public ICommand Command { get; set; }
    }
}