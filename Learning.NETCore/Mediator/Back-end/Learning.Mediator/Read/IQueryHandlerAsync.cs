using System.Threading.Tasks;

namespace Learning.Mediator
{
    public interface IQueryHandlerAsync<in TQuery, TResponse> where TQuery : IQuery<TResponse>
    {
        Task<TResponse> Handle(TQuery command);
    }
}