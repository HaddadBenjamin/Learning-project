namespace Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext
{
    public interface IAuthentificationContextUserProvider
    {
        IAuthentificationContextUser Get(string email);
    }
}