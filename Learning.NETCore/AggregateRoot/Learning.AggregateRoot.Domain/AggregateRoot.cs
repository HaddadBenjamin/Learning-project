using System;
using System.Collections.Generic;
using System.Linq;
using Learning.AggregateRoot.Domain.Exceptions;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;

namespace Learning.AggregateRoot.Domain
{
    public abstract class AggregateRoot
    {
        public Guid Id { get; set; }
        public int Version { get; set; }
        // Ne devrait pas être à ce niveau ?
        public bool IsActive { get; set; }
        public Guid CreatedBy { get; set; }
        public Guid CreatedOnBehalfOf { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid LastUpdatedBy { get; set; }
        public Guid LastUpdatedOnBehalfOf { get; set; }
        public DateTime LastUpdatedAt { get; set; }
        private List<IEvent> _events { get; } = new List<IEvent>();

        public IReadOnlyCollection<IEvent> FlushEvents()
        {
            if (Id == Guid.Empty)
                throw new AggregateMissingIdException(GetType());

            foreach (var @event in _events.Where(e => e.Id == Guid.Empty))
                throw new EventMissingIdException(GetType(), @event.GetType());

            var events = _events.ToList();

            _events.Clear();
            
            return events;
        }

        public void MarkAsCreated(IAuthentificationContext authentificationContext)
        {
            CreatedAt = DateTime.UtcNow;
            CreatedBy = authentificationContext.User.Id;
            CreatedOnBehalfOf = authentificationContext.ImpersonatedUser.Id;
        }

        public void MarkAsUpdated(IAuthentificationContext authentificationContext)
        {
            LastUpdatedAt = DateTime.UtcNow;
            LastUpdatedBy = authentificationContext.User.Id;
            LastUpdatedOnBehalfOf = authentificationContext.ImpersonatedUser.Id;
        }

        protected void RaiseEvent(IEvent @event)
        {
            if (@event.Id == Guid.Empty)
                @event.Id = Guid.NewGuid();

            @event.Version = ++Version;
            @event.Date = DateTime.UtcNow;

            _events.Add(@event);
        }

        #region Event sourcing like (brouillon)
        public void ReplayEvents(IReadOnlyCollection<IEvent> events)
        {
            foreach (var @event in events)
                MutateState(@event);
        }

        // En fonction des implémentations, cette méthode n'est pas forcément présente mais elle permet de valider tout l'état de votre racine d'aggrégat.
        // Elle doit être appelé entre la mutation de l'état et le raise event.
        protected virtual void ValidateState() { }

        // Switch (@event) et en fonction du type tu appliques une mutation de l'état.
        protected virtual void MutateState(IEvent @event) { }
        #endregion
    }
}