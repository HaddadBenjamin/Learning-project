using Learning.AggregateRoot.Domain.CQRS.Interfaces;
using Learning.AggregateRoot.Infrastructure.Example.DbContext;

namespace Learning.AggregateRoot.Infrastructure.CQRS
{
    public class GenericRepository<TAggregate> : Repository<TAggregate, YourDbContext>
        where TAggregate : Domain.CQRS.AggregateRoot
    {
        public GenericRepository(YourDbContext context, IUnitOfWork unitOfWork) : base(context, unitOfWork) { }
    }
}