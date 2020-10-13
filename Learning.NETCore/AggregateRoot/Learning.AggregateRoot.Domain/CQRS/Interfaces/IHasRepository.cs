namespace Learning.AggregateRoot.Domain.CQRS.Interfaces
{
    // Le <out ..> permet de stocker le type enfant plutôt que le type fils dans la classe qui l'implémentera, c'est très cool.
    public interface IHasRepository<TAggregate, out TRepository>
        where TAggregate : AggregateRoot
        where TRepository : IRepository<TAggregate>
    {
        TRepository Repository { get; }
    }
}