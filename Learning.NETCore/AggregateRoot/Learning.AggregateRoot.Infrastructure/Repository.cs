﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;
using Microsoft.EntityFrameworkCore;

namespace Learning.AggregateRoot.Infrastructure
{
    public abstract class Repository<TAggregate, TContext> : IRepository<TAggregate>
        where TAggregate : Domain.AggregateRoot
        where TContext : DbContext
    {
        protected TContext DbContext { get; }

        protected DbSet<TAggregate> DbSet => DbContext.Set<TAggregate>();
        protected IQueryable<TAggregate> Queryable => DbContext.Set<TAggregate>();

        protected Repository(TContext context) => DbContext = context;

        public virtual TAggregate Get<TProperty>(Guid id, params Expression<Func<TAggregate, IEnumerable<TProperty>>>[] includes)
        {
            var queryableWithIncludes = includes.Aggregate(Queryable, (queryable, propertyToInclude) => queryable.Include(propertyToInclude));

            return queryableWithIncludes.SingleOrDefault(aggregate => aggregate.Id == id);
        }

        public virtual IQueryable<TAggregate> Search<TProperty>(params Expression<Func<TAggregate, IEnumerable<TProperty>>>[] includes) =>
            includes.Aggregate(Queryable, (queryable, propertyToInclude) => queryable.Include(propertyToInclude));

        public void Add(TAggregate aggregate) => DbSet.Add(aggregate);
        public void Update(TAggregate aggregate) => DbSet.Update(aggregate);
        public void Remove(TAggregate aggregate) => DbSet.Remove(aggregate);

        public async Task SaveChanges() => await DbContext.SaveChangesAsync();
    }
}