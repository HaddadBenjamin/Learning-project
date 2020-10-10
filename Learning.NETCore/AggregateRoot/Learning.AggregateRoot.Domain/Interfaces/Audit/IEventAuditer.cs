using System.Collections.Generic;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;

namespace Learning.AggregateRoot.Domain.Interfaces.Audit
{
    public interface IEventAuditer
    {
        Task Audit(IReadOnlyCollection<IEvent> events);
    }
}