using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Learning.AggregateRoot
{
    // Devrais-je renommer mes TAggregate en TEntity ou TRecord ?
    public interface IRepository<TAggregate> where TAggregate : AggregateRoot
    {
        TAggregate Get<TProperty>(Guid id, params Expression<Func<TAggregate, IEnumerable<TProperty>>>[] includes);
        IQueryable<TAggregate> Search<TProperty>(params Expression<Func<TAggregate, IEnumerable<TProperty>>>[] includes);

        void Add(TAggregate aggregate);
        void Update(TAggregate aggregate);
        void Remove(TAggregate aggregate);

        // Est-ce que cette méthode devrait plutôt se retrouver dans le modèle de conception "Unit of work" ?
        Task SaveChanges();
    }
}