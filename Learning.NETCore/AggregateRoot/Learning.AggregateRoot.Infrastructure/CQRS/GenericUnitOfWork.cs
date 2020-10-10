using Learning.AggregateRoot.Infrastructure.Example.DbContext;

namespace Learning.AggregateRoot.Infrastructure.CQRS
{
    public class GenericUnitOfWork : UnitOfWork<YourDbContext>
    {
        public GenericUnitOfWork(YourDbContext dbContext) : base(dbContext) { }
    }
}