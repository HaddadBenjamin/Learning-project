namespace Learning.AggregateRoot.Domain.AuthentificationContext
{
    public interface IAuthentificationContextUserProvider
    {
        AuthentificationContextUser Get(string email);
    }
}