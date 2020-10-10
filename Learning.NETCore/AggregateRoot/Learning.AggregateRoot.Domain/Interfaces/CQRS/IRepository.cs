using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Learning.AggregateRoot.Domain.Interfaces.CQRS
{
    // Devrais-je renommer mes TAggregate en TEntity ou TRecord ?
    public interface IRepository<TAggregate> where TAggregate : AggregateRoot
    {
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
    }
}