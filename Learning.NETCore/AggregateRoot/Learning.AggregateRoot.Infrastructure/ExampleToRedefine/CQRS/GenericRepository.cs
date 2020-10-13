using Learning.AggregateRoot.Domain.CQRS.Interfaces;
using Learning.AggregateRoot.Infrastructure.CQRS;
using Learning.AggregateRoot.Infrastructure.ExampleToRedefine.DbContext;

namespace Learning.AggregateRoot.Infrastructure.ExampleToRedefine.CQRS
{
    public class GenericRepository<TAggregate> : Repository<TAggregate, YourDbContext>
        where TAggregate : Domain.CQRS.AggregateRoot
    {
        public GenericRepository(YourDbContext context, IUnitOfWork unitOfWork) : base(context, unitOfWork) { }
    }
}