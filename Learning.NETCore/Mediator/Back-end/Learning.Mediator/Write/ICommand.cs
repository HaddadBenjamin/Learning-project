namespace Learning.Mediator
{
    public interface ICommand { }

    public interface ICommand<out TResponse> { }
}