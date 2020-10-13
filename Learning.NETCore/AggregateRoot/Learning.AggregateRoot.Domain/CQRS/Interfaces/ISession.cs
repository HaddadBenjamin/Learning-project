using System.Collections.Generic;
using System.Threading.Tasks;

namespace Learning.AggregateRoot.Domain.CQRS.Interfaces
{
    /// <summary>
    /// Classe qui s'occupe de la gestion du trackage de vos aggregates roots créés, modifiés et supprimés ce qui permet de récupérer leur évènements au moment de la sauvegarde et de les envoyer dans le médiateur.
    /// Cette classe permet aussi d'encapsuler les modèles de conceptions repository et unit of work afin de réduire le couplage de nos handleurs en injectant seulement la session plutôt qu'un repository et unit of work.
    /// </summary>
    public interface ISession<TAggregate> : ISession<TAggregate, IRepository<TAggregate>> where TAggregate : AggregateRoot { }

    public interface ISession<TAggregate, out TRepository> :
        IHasRepository<TAggregate, TRepository>,
        ITrack<TAggregate>,
        IRepository<TAggregate> where TAggregate : AggregateRoot
        where TRepository : IRepository<TAggregate>
    {
        Task<IReadOnlyCollection<IEvent>> SaveChanges();
    }
}