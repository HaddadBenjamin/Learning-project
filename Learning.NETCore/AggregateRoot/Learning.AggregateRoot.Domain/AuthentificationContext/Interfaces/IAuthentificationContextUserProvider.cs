namespace Learning.AggregateRoot.Domain.AuthentificationContext.Interfaces
{
    public interface IAuthentificationContextUserProvider
    {
        AuthentificationContextUser Get(string email);
    }
}