using System.Threading.Tasks;

namespace Learning.Mediator
{
    public interface IMediator
    {
        #region Write
        void Publish(ICommand command);

        TResponse Publish<TResponse>(ICommand<TResponse> command);

        Task PublishAsync(ICommand command);
       
        Task<TResponse> PublishAsync<TResponse>(ICommand<TResponse> command);
        #endregion

        #region Read
        TResponse Publish<TResponse>(IQuery<TResponse> query);
     
        Task<TResponse> PublishAsync<TResponse>(IQuery<TResponse> query);
        #endregion

        #region Events
        void Publish<TResponse>(IEvent @event);

        Task PublishAsync<TResponse>(IEvent @event);
        #endregion
    }
}