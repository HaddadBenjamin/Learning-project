using MediatR;

namespace Learning.AggregateRoot.Domain.CQRS.Interfaces
{
    public interface IQuery<TQueryResult> : IRequest<TQueryResult> { }
}