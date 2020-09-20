using System.Threading.Tasks;

namespace Learning.Mediator
{
    public interface IMediator
    {
        #region Commands
        void Send(ICommand command);

        TResponse Send<TResponse>(ICommand<TResponse> command);

        Task SendAsync(ICommand command);
       
        Task<TResponse> SendAsync<TResponse>(ICommand<TResponse> command);
        #endregion

        #region Queries
        TResponse Send<TResponse>(IQuery<TResponse> query);
     
        Task<TResponse> SendAsync<TResponse>(IQuery<TResponse> query);
        #endregion

        #region Events
        TResponse Send<TResponse>(IEvent @event);

        Task<TResponse> SendAsync<TResponse>(IEvent @event);
        #endregion
    }
}