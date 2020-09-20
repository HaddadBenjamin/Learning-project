using System;
using System.Collections.Concurrent;
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

    public class Mediator : IMediator
    {
        private readonly IServiceProvider _serviceProvider;

        public Mediator(IServiceProvider serviceProvider) => _serviceProvider = serviceProvider;

        public void Send(ICommand command) =>
            ((ICommandHandler<ICommand>)_serviceProvider.GetService(typeof(ICommandHandler<ICommand>))).Handle(command);

        public TResponse Send<TResponse>(ICommand<TResponse> command)
        {
            var handler = (ICommandHandler<ICommand<TResponse>, TResponse>)_serviceProvider.GetService(typeof(ICommandHandler<ICommand<TResponse>, TResponse>));

            return handler.Handle(command);
        }

        public Task SendAsync(ICommand command) =>
            ((ICommandHandlerAsync<ICommand>)_serviceProvider.GetService(typeof(ICommandHandlerAsync<ICommand>))).Handle(command);


        public Task<TResponse> SendAsync<TResponse>(ICommand<TResponse> command)
        {
            var handler = (ICommandHandlerAsync<ICommand<TResponse>, TResponse>)_serviceProvider.GetService(typeof(ICommandHandlerAsync<ICommand<TResponse>, TResponse>));

            return handler.Handle(command);
        }

        public TResponse Send<TResponse>(IQuery<TResponse> query)
        {
            throw new System.NotImplementedException();
        }

        public Task<TResponse> SendAsync<TResponse>(IQuery<TResponse> query)
        {
            throw new System.NotImplementedException();
        }

        public TResponse Send<TResponse>(IEvent @event)
        {
            throw new System.NotImplementedException();
        }

        public Task<TResponse> SendAsync<TResponse>(IEvent @event)
        {
            throw new System.NotImplementedException();
        }
    }
}