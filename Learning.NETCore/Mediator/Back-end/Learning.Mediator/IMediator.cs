using System.Threading.Tasks;

namespace Learning.Mediator
{
    public interface IMediator
    {
        #region Write
        void Send(ICommand command);

        TResponse Send<TResponse>(ICommand<TResponse> command);

        Task SendAsync(ICommand command);
       
        Task<TResponse> SendAsync<TResponse>(ICommand<TResponse> command);
        #endregion

        #region Read
        TResponse Send<TResponse>(IQuery<TResponse> query);
     
        Task<TResponse> SendAsync<TResponse>(IQuery<TResponse> query);
        #endregion

        #region Events
        void Send(IEvent @event);

        Task SendAsync(IEvent @event);
        #endregion
    }
}