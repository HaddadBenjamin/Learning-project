using System.Collections.Generic;
using System.Threading.Tasks;

namespace Learning.AggregateRoot.Domain.Interfaces.CQRS
{
    public interface ISession<TAggregate> : ISession<TAggregate, IRepository<TAggregate>>
        where TAggregate : AggregateRoot
    { }

    public interface ISession<TAggregate, out TRepository> :
        IHasRepository<TAggregate, TRepository>,
        ITrack<TAggregate>,
        IRepository<TAggregate> where TAggregate : AggregateRoot
        where TRepository : IRepository<TAggregate>
    {
        Task<IReadOnlyCollection<IEvent>> SaveChanges();
    }
}