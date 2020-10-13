using System;
using System.Collections;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;
using Learning.AggregateRoot.Infrastructure.ExampleToRedefine.CQRS;
using Microsoft.EntityFrameworkCore.Storage;

namespace Learning.AggregateRoot.Infrastructure.CQRS
{
    public class UnitOfWork<TDbContext> : IUnitOfWork
        where TDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        private readonly TDbContext _dbContext;
        private Hashtable _repositories = new Hashtable();
        private IDbContextTransaction _transaction;

        public UnitOfWork(TDbContext dbContext) => _dbContext = dbContext;

        public IRepository<TAggregate> Repository<TAggregate>() where TAggregate : Domain.CQRS.AggregateRoot
        {
            var aggregateTypeName = typeof(TAggregate).Name;

            if (!_repositories.ContainsKey(aggregateTypeName))
                _repositories.Add(aggregateTypeName, Activator.CreateInstance(typeof(GenericRepository<>).MakeGenericType(typeof(TAggregate)), _dbContext));

            return (IRepository<TAggregate>)_repositories[aggregateTypeName];
        }

        public async Task SaveChangesAsync() => await _dbContext.SaveChangesAsync();

        public void BeginTransaction() => _transaction = _dbContext.Database.BeginTransaction();

        public void CommitTransaction()
        {
            try
            {
                _dbContext.SaveChanges();
                _transaction.Commit();
            }
            finally
            {
                _transaction.Dispose();
            }
        }

        public void RollbackTransaction()
        {
            _transaction.Rollback();
            _transaction.Dispose();
        }
    }
}