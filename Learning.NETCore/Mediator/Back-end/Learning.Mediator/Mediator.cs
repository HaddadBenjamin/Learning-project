using System;
using System.Threading.Tasks;

namespace Learning.Mediator
{
    public class Mediator : IMediator
    {
        //TODO Register dependencies to optimize, mediator should be singleton
        private readonly IServiceProvider _serviceProvider;

        public Mediator(IServiceProvider serviceProvider) => _serviceProvider = serviceProvider;

        #region Write
        public void Send(ICommand command) =>
            ((ICommandHandler<ICommand>)_serviceProvider.GetService(typeof(ICommandHandler<ICommand>))).Handle(command);

        public TResponse Send<TResponse>(ICommand<TResponse> command) =>
            ((ICommandHandler<ICommand<TResponse>, TResponse>)_serviceProvider.GetService(typeof(ICommandHandler<ICommand<TResponse>, TResponse>))).Handle(command);

        public Task SendAsync(ICommand command) =>
            ((ICommandHandlerAsync<ICommand>)_serviceProvider.GetService(typeof(ICommandHandlerAsync<ICommand>))).Handle(command);

        public Task<TResponse> SendAsync<TResponse>(ICommand<TResponse> command) =>
            ((ICommandHandlerAsync<ICommand<TResponse>, TResponse>)_serviceProvider.GetService(typeof(ICommandHandlerAsync<ICommand<TResponse>, TResponse>))).Handle(command);
        #endregion

        #region Read
        public TResponse Send<TResponse>(IQuery<TResponse> query) =>
            ((IQueryHandler<IQuery<TResponse>, TResponse>)_serviceProvider.GetService(typeof(IQueryHandler<IQuery<TResponse>, TResponse>))).Handle(query);

        public Task<TResponse> SendAsync<TResponse>(IQuery<TResponse> query) =>
            ((IQueryHandlerAsync<IQuery<TResponse>, TResponse>)_serviceProvider.GetService(typeof(IQueryHandlerAsync<IQuery<TResponse>, TResponse>))).Handle(query);
        #endregion

        #region Events
        public void Send<TResponse>(IEvent @event) =>
            ((IEventHandler<IEvent>)_serviceProvider.GetService(typeof(IEventHandler<IEvent>))).Handle(@event);

        public Task SendAsync<TResponse>(IEvent @event) =>
            ((IEventHandlerAsync<IEvent>)_serviceProvider.GetService(typeof(IEventHandlerAsync<IEvent>))).Handle(@event);
        #endregion
    }
}