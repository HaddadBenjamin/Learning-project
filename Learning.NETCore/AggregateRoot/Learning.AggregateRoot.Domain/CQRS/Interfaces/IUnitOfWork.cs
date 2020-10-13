using System.Threading.Tasks;

namespace Learning.AggregateRoot.Domain.CQRS.Interfaces
{
    public interface IUnitOfWork
    {
        IRepository<TAggregate> Repository<TAggregate>() where TAggregate : AggregateRoot;
        Task SaveChangesAsync();

        void BeginTransaction();
        void CommitTransaction();
        void RollbackTransaction();
    }
}