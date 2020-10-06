namespace Learning.AggregateRoot.Domain.Interfaces
{
    public interface IAuthentificationContextUserProvider
    {
        IAuthentificationContextUser Get(string email);
    }
}