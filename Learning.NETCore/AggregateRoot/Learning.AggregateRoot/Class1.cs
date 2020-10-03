using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Learning.AggregateRoot
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
    
    // Doit être setté par un middleware.
    public interface IAuthentificationContext
    {
        public User User { get; set; }
        public User ImpersonifiedUser { get; set; }
        public Guid CorrelationId { get; set; }
    }

    public interface IEvent
    {
        public Guid Id { get; set; }
        public Guid CorrelationId { get; set; }
    }

    public abstract class AggregateRoot
    {
        public Guid Id { get; set; }
        public int Version { get; set; }
        public bool IsActive { get; set; }
        public Guid CreatedBy { get; set; }
        public Guid CreatedOnBehalf { get; set; } // imperso
        public DateTime CreatedAt { get; set; }
        public Guid UpdatedBy { get; set; }
        public Guid UpdatedOnBehalf { get; set; } // imperso
        public DateTime UpdatedAt { get; set; }
        private List<IEvent> _events { get; set; } = new List<IEvent>();

        public void IncrementVersionAndMarkAsCreatedAndUpdated(IAuthentificationContext authentificationContext)
        {
            ++Version;

            if (CreatedBy == default)
                MarkAsCreated(authentificationContext);
            
            MarkAsUpdated(authentificationContext);
        }

        public IReadOnlyCollection<IEvent> GetEvents() => _events;

        public void ClearEvents() => _events.Clear();

        #region Event sourcing like (brouillon)
        public void ReplayEvents(IReadOnlyCollection<IEvent> events)
        {
            foreach (var @event in events)
                MutateState(@event);
        }
        
        // En fonction des implémentations, cette méthode n'est pas forcément présente mais elle permet de valider tout l'état de votre racine d'aggrégat.
        // Elle doit être appelé entre la mutation de l'état et le raise event.
        protected abstract void ValidateState();
       
        // Switch (@event) et en fonction du type tu appliques une mutation de l'état.
        protected abstract void MutateState(IEvent @event);
        #endregion

        protected void RaiseEvent(IEvent @event) => _events.Add(@event);

        private void MarkAsCreated(IAuthentificationContext authentificationContext)
        {
            CreatedBy = authentificationContext.User.Id;
            CreatedAt = DateTime.UtcNow;
            CreatedOnBehalf = authentificationContext.ImpersonifiedUser.Id;
        }

        private void MarkAsUpdated(IAuthentificationContext authentificationContext)
        {
            UpdatedBy = authentificationContext.User.Id;
            UpdatedAt = DateTime.UtcNow;
            UpdatedOnBehalf = authentificationContext.ImpersonifiedUser.Id;
        }
    }

    public class InternalSession
    {
        private readonly IAuthentificationContext _authentificationContext;

        private readonly IUnitOfWork _unitOfWork;

        // ConcurentDictionary ?
        private Dictionary<Guid, AggregateRoot> _trackedAggregates = new Dictionary<Guid, AggregateRoot>();

        public InternalSession(IAuthentificationContext authentificationContext, IUnitOfWork unitOfWork)
        {
            _authentificationContext = authentificationContext;
            _unitOfWork = unitOfWork;
        }

        public void Track(AggregateRoot aggregate)
        {
            // TODO : test null Aggregate or id null
            _trackedAggregates[aggregate.Id] = aggregate;
        }

        public void UnTrack(AggregateRoot aggregate)
        {
            // TODO : test null Aggregate or id null
            if (_trackedAggregates.ContainsKey(aggregate.Id))
                _trackedAggregates.Remove(aggregate.Id);
        }

        public async Task<bool> SaveChangesAsync()
        {
            foreach (var trackedAggregate in _trackedAggregates.Values)
            {
                trackedAggregate.IncrementVersionAndMarkAsCreatedAndUpdated(_authentificationContext);

                // Les lignes suivantes correspondent à un PublishEvents()
                foreach (var @event in trackedAggregate.GetEvents())
                {
                    @event.CorrelationId = _authentificationContext.CorrelationId;
                    // mediator.SendEvent(@event);
                }

                // DbContext.MarkAsTracked / Update ?
                _trackedAggregates.Clear();
            }

            return await _unitOfWork.SaveChangesAsync();
        }
    }

    public class Session<TAggregate> where TAggregate : AggregateRoot
    {
        // Il me semble qu'uon associe un repository par défault que l'on peut overrider.
        public TAggregate GetActive(Guid id, params Expression<Func<TAggregate, IEnumerable<object>>>[] collections)
        {
            var query = collections.Aggregate((IQueryable<TAggregate>)DbSet, (queryable, collection) => queryable.Include(collection));
            return query.FirstOrDefault(c => c.IsActive && c.Id == id);
        }

        public virtual Task<TSource> FirstOrDefaultAsync<TSource>(IQueryable<TSource> source, Expression<Func<TSource, bool>> predicate) => source.FirstOrDefaultAsync(predicate);
    }

    public interface IUnitOfWork
    {
        IGenericRepository<TAggregate> GetRepository<TAggregate>() where TAggregate : AggregateRoot;

        Task<bool> SaveChangesAsync();
        Task BeginTransactionAsync();
        Task CommiTransactionAsync();
        Task RollbackTransactionAsync();
    }
}
