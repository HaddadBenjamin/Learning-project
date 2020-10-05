﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Learning.AggregateRoot.Domain.Interfaces
{
    public interface ISession<TAggregate, out TRepository> : IHasRepository<TAggregate, TRepository>
        where TAggregate : AggregateRoot
        where TRepository : IRepository<TAggregate>
    {
        void Track(TAggregate aggregate);
        void UnTrack(TAggregate aggregate);

        TAggregate Get<TProperty>(Guid id, params Expression<Func<TAggregate, IEnumerable<TProperty>>>[] includes);
        IQueryable<TAggregate> Search<TProperty>(params Expression<Func<TAggregate, IEnumerable<TProperty>>>[] includes);

        void Add(TAggregate aggregate);
        void Update(TAggregate aggregate);
        void Remove(TAggregate aggregate);

        Task<IReadOnlyCollection<IEvent>> SaveChanges();
    }
}