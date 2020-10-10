using System.Threading.Tasks;

namespace Learning.AggregateRoot.Domain.Interfaces.CQRS
{
    public interface IUnitOfWork
    {
        IRepository<TAggregate> Repository<TAggregate>() where TAggregate : AggregateRoot;
        Task SaveChangesAsync();
    }
}