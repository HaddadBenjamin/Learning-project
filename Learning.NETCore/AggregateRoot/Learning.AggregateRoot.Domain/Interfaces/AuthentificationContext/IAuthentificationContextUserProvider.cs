namespace Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext
{
    public interface IAuthentificationContextUserProvider
    {
        AuthentificationContextUser Get(string email);
    }
}