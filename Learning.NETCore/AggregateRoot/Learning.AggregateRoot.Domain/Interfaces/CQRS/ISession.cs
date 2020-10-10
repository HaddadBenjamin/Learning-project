using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Learning.AggregateRoot.Domain.Interfaces.CQRS
{
    public interface ISession<TAggregate> : ISession<TAggregate, IRepository<TAggregate>>
        where TAggregate : AggregateRoot
    { }

    public interface ISession<TAggregate, out TRepository> : IHasRepository<TAggregate, TRepository>
        where TAggregate : AggregateRoot
        where TRepository : IRepository<TAggregate>
    {
        void Track(TAggregate aggregate);
        void UnTrack(TAggregate aggregate);

        TAggregate Get(Guid id);
        TAggregate Get<TPropertyIncluded>(Guid id, params Expression<Func<TAggregate, IEnumerable<TPropertyIncluded>>>[] includes);
        TAggregate GetActive(Guid id);
        TAggregate GetActive<TPropertyIncluded>(Guid id, params Expression<Func<TAggregate, IEnumerable<TPropertyIncluded>>>[] includes);

        IQueryable<TAggregate> Search();
        IQueryable<TAggregate> Search<TPropertyIncluded>(params Expression<Func<TAggregate, IEnumerable<TPropertyIncluded>>>[] includes);
        IQueryable<TAggregate> SearchActive();
        IQueryable<TAggregate> SearchActive<TPropertyIncluded>(params Expression<Func<TAggregate, IEnumerable<TPropertyIncluded>>>[] includes);

        void Add(TAggregate aggregate);
        void Update(TAggregate aggregate);
        void Remove(TAggregate aggregate);

        Task<IReadOnlyCollection<IEvent>> SaveChanges();
    }
}