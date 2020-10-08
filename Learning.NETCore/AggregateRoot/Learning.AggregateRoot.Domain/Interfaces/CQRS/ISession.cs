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

        TAggregate Get<TProperty>(Guid id);
        TAggregate Get<TProperty>(Guid id, params Expression<Func<TAggregate, IEnumerable<TProperty>>>[] includes);
        TAggregate GetActive<TProperty>(Guid id);
        TAggregate GetActive<TProperty>(Guid id, params Expression<Func<TAggregate, IEnumerable<TProperty>>>[] includes);
        IQueryable<TAggregate> Search<TProperty>();
        IQueryable<TAggregate> Search<TProperty>(params Expression<Func<TAggregate, IEnumerable<TProperty>>>[] includes);
        IQueryable<TAggregate> SearchActive<TProperty>();
        IQueryable<TAggregate> SearchActive<TProperty>(params Expression<Func<TAggregate, IEnumerable<TProperty>>>[] includes);

        void Add(TAggregate aggregate);
        void Update(TAggregate aggregate);
        void Remove(TAggregate aggregate);

        Task<IReadOnlyCollection<IEvent>> SaveChanges();
    }
}