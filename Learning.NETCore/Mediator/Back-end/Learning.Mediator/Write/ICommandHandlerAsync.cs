using System.Threading.Tasks;

namespace Learning.Mediator
{
    public interface ICommandHandlerAsync<in TCommand> where TCommand : ICommand
    {
        Task Handle(TCommand command);
    }

    public interface ICommandHandlerAsync<in TCommand, TResponse> where TCommand : ICommand<TResponse>
    {
        Task<TResponse> Handle(TCommand command);
    }

}