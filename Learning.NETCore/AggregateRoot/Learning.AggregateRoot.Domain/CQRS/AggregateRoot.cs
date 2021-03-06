﻿using System;
using System.Collections.Generic;
using System.Linq;
using Learning.AggregateRoot.Domain.Audit.Attributes;
using Learning.AggregateRoot.Domain.AuthentificationContext;
using Learning.AggregateRoot.Domain.CQRS.Exceptions;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;

namespace Learning.AggregateRoot.Domain.CQRS
{
    /// <summary>
    /// Martin Fowler : Aggregate is a pattern in Domain-Driven Design. A DDD aggregate is a cluster of domain objects that can be treated as a single unit.
    /// An aggregate will have one of its component objects be the aggregate root. Any references from outside the aggregate should only go to the aggregate root. The root can thus ensure the integrity of the aggregate as a whole.
    /// ------------------------------------------------------------------------------------------------------------------
    /// Veuillez choisir les options qui vous intéresse à savoir avec ou sans audit, suppression logique ou event sourcing.
    /// </summary>
    public abstract class AggregateRoot
    {
        #region Le minimum nécéssaire
        public Guid Id { get; set; }
        [ShallNotAudit] public int Version { get; set; }

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

        protected void RaiseEvent(IEvent @event)
        {
            if (@event.Id == Guid.Empty)
                @event.Id = Guid.NewGuid();

            @event.Version = ++Version;
            @event.Date = DateTime.UtcNow;

            _events.Add(@event);
        }
        #endregion

        #region Les options non obligatoires
        #region Avec suppression logique
        public bool IsActive { get; set; } = true;
        #endregion

        #region Avec audit
        [ShallNotAudit] public Guid CreatedBy { get; set; }
        [ShallNotAudit] public Guid CreatedOnBehalfOf { get; set; }
        [ShallNotAudit] public DateTime CreatedAt { get; set; }
        [ShallNotAudit] public Guid LastUpdatedBy { get; set; }
        [ShallNotAudit] public Guid LastUpdatedOnBehalfOf { get; set; }
        [ShallNotAudit] public DateTime LastUpdatedAt { get; set; }

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
        #endregion

        #region Avec event sourcing (code brouillon)
        public void ReplayEvents(IReadOnlyCollection<IEvent> events)
        {
            foreach (var @event in events)
            {
                MutateState(@event);
                ++Version;
            }
        }

        // En fonction des implémentations, cette méthode n'est pas forcément présente mais elle permet de valider tout l'état de votre racine d'aggrégat.
        // Elle doit être appelé entre la mutation de l'état et le raise event.
        protected virtual void ValidateState() { }

        // Switch (@event) et en fonction du type tu appliques une mutation de l'état.
        protected virtual void MutateState(IEvent @event) { }
        #endregion
        #endregion
    }
}