using System.Threading.Tasks;

namespace Learning.AggregateRoot.Domain.CQRS.Interfaces
{
    /// <summary>
    /// Martin Fowler : Maintains a list of objects affected by a business transaction and coordinates the writing out of changes and the resolution of concurrency problems.
    /// </summary>
    public interface IUnitOfWork
    {
        IRepository<TAggregate> Repository<TAggregate>() where TAggregate : AggregateRoot;
        Task SaveChangesAsync();

        void BeginTransaction();
        void CommitTransaction();
        void RollbackTransaction();
    }
}