using Learning.AggregateRoot.Domain.AuthentificationContext;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;

namespace Learning.AggregateRoot.Infrastructure.CQRS
{
    public class Session<TAggregate, TRepository> :
        InternalSession<TAggregate>,
        ISession<TAggregate, TRepository>
        where TAggregate : Domain.CQRS.AggregateRoot
        where TRepository : IRepository<TAggregate>
    {
        public Session(TRepository repository, IAuthentificationContext authentificationContext, IMediator mediator) :
            base(repository, authentificationContext, mediator) =>
            Repository = repository;

        public TRepository Repository { get; }
    }

    public class Session<TAggregate> :
        InternalSession<TAggregate>,
        ISession<TAggregate>
        where TAggregate : Domain.CQRS.AggregateRoot
    {
        public Session(IRepository<TAggregate> repository, IAuthentificationContext authentificationContext, IMediator mediator) :
            base(repository, authentificationContext, mediator) { }
    }
}
