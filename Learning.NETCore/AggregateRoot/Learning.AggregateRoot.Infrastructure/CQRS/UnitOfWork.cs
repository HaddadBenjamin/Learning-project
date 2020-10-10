using System;
using System.Collections;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;

namespace Learning.AggregateRoot.Infrastructure.CQRS
{
    public class UnitOfWork<TDbContext> : IUnitOfWork
        where TDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        private readonly TDbContext _dbContext;
        private Hashtable _repositories = new Hashtable();

        public UnitOfWork(TDbContext dbContext) => _dbContext = dbContext;

        public IRepository<TAggregate> Repository<TAggregate>() where TAggregate : Domain.AggregateRoot
        {
            var aggregateTypeName = typeof(TAggregate).Name;

            if (!_repositories.ContainsKey(aggregateTypeName))
            {
                var repositoryInstance = Activator.CreateInstance(typeof(GenericRepository<>).MakeGenericType(typeof(TAggregate)), _dbContext);

                _repositories.Add(aggregateTypeName, repositoryInstance);
            }

            return (IRepository<TAggregate>)_repositories[aggregateTypeName];
        }

        public async Task SaveChangesAsync() => await _dbContext.SaveChangesAsync();
    }
}