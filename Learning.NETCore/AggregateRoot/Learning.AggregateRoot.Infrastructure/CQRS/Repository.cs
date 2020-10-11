using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;
using Microsoft.EntityFrameworkCore;

namespace Learning.AggregateRoot.Infrastructure.CQRS
{
    public abstract class Repository<TAggregate, TDbContext> : IRepository<TAggregate>
        where TAggregate : Domain.AggregateRoot
        where TDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public IUnitOfWork UnitOfWork { get; }
        public IQueryable<TAggregate> Queryable => DbContext.Set<TAggregate>();
        private TDbContext DbContext { get; }
        private DbSet<TAggregate> DbSet => DbContext.Set<TAggregate>();

        protected Repository(TDbContext context, IUnitOfWork unitOfWork)
        {
            DbContext = context;
            UnitOfWork = unitOfWork;
        }

        public virtual TAggregate Get(Guid id) => Queryable.SingleOrDefault(aggregate => aggregate.Id == id);
        public virtual TAggregate Get<TProperty>(Guid id, params Expression<Func<TAggregate, IEnumerable<TProperty>>>[] includes) => Search(includes).SingleOrDefault(aggregate => aggregate.Id == id);
        public virtual TAggregate GetActive(Guid id) => Queryable.SingleOrDefault(aggregate => aggregate.Id == id && aggregate.IsActive);
        public virtual TAggregate GetActive<TProperty>(Guid id, params Expression<Func<TAggregate, IEnumerable<TProperty>>>[] includes) => Search(includes).SingleOrDefault(aggregate => aggregate.Id == id && aggregate.IsActive);

        public virtual IQueryable<TAggregate> Search() => Queryable;
        public virtual IQueryable<TAggregate> Search<TPropertyIncluded>(params Expression<Func<TAggregate, IEnumerable<TPropertyIncluded>>>[] includes) => includes.Aggregate(Queryable, (queryable, propertyToInclude) => queryable.Include(propertyToInclude));
        public virtual IQueryable<TAggregate> SearchActive() => Queryable.Where(aggregate => aggregate.IsActive);
        public virtual IQueryable<TAggregate> SearchActive<TPropertyIncluded>(params Expression<Func<TAggregate, IEnumerable<TPropertyIncluded>>>[] includes) => Search(includes).Where(aggregate => aggregate.IsActive);

        public void Add(TAggregate aggregate) => DbSet.Add(aggregate);
        public void Update(TAggregate aggregate) => DbSet.Update(aggregate);
        public void Remove(TAggregate aggregate) => DbSet.Remove(aggregate);
    }
}