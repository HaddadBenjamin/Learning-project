using System.Collections.Generic;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;

namespace Learning.AggregateRoot.Domain.Audit.Commands
{
    public class CreateAuditEvents : ICommand
    {
        public IReadOnlyCollection<IEvent> Events { get; set; }
    }
}
