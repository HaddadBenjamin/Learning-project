using Learning.AggregateRoot.Domain.CQRS.Interfaces;

namespace Learning.AggregateRoot.Domain.Audit.Commands
{
    public class CreateAuditQuery : ICommand
    {
        public object Query { get; set; }
        public object QueryResult { get; set; }
    }
}