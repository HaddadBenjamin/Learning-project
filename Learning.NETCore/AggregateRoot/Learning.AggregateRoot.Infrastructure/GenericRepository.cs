namespace Learning.AggregateRoot.Infrastructure
{
    public class GenericRepository<TAggregate> : Repository<TAggregate, YourDbContext>
        where TAggregate : Domain.AggregateRoot
    {
        public GenericRepository(YourDbContext context) : base(context) { }
    }
}