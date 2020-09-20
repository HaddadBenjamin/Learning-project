using System;
using System.Threading.Tasks;

namespace Learning.Mediator
{
    public class Mediator : IMediator
    {
        //TODO Register dependencies to optimize, mediator should be singleton
        private readonly IServiceProvider _serviceProvider;

        public Mediator(IServiceProvider serviceProvider) => _serviceProvider = serviceProvider;

        public void Publish(ICommand command) =>
            ((ICommandHandler<ICommand>)_serviceProvider.GetService(typeof(ICommandHandler<ICommand>))).Handle(command);

        public TResponse Publish<TResponse>(ICommand<TResponse> command)
        {
            var handler = (ICommandHandler<ICommand<TResponse>, TResponse>)_serviceProvider.GetService(typeof(ICommandHandler<ICommand<TResponse>, TResponse>));

            return handler.Handle(command);
        }

        public Task PublishAsync(ICommand command) =>
            ((ICommandHandlerAsync<ICommand>)_serviceProvider.GetService(typeof(ICommandHandlerAsync<ICommand>))).Handle(command);


        public Task<TResponse> PublishAsync<TResponse>(ICommand<TResponse> command)
        {
            var handler = (ICommandHandlerAsync<ICommand<TResponse>, TResponse>)_serviceProvider.GetService(typeof(ICommandHandlerAsync<ICommand<TResponse>, TResponse>));

            return handler.Handle(command);
        }

        public TResponse Publish<TResponse>(IQuery<TResponse> query)
        {
            var handler = (IQueryHandler<IQuery<TResponse>, TResponse>)_serviceProvider.GetService(typeof(IQueryHandler<IQuery<TResponse>, TResponse>));

            return handler.Handle(query);
        }

        public Task<TResponse> PublishAsync<TResponse>(IQuery<TResponse> query)
        {
            var handler = (IQueryHandlerAsync<IQuery<TResponse>, TResponse>)_serviceProvider.GetService(typeof(IQueryHandlerAsync<IQuery<TResponse>, TResponse>));

            return handler.Handle(query);
        }

        public void Publish<TResponse>(IEvent @event) =>
            ((IEventHandler<IEvent>)_serviceProvider.GetService(typeof(IEventHandler<IEvent>))).Handle(@event);

        public Task PublishAsync<TResponse>(IEvent @event) =>
            ((IEventHandlerAsync<IEvent>)_serviceProvider.GetService(typeof(IEventHandlerAsync<IEvent>))).Handle(@event);

    }
}