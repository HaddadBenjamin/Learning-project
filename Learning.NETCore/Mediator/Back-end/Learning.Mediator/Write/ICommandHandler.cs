namespace Learning.Mediator
{
    public interface ICommandHandler<in TCommand, TResponse> where TCommand : ICommand<TResponse>
    {
        TResponse Handle(TCommand command);
    }
}