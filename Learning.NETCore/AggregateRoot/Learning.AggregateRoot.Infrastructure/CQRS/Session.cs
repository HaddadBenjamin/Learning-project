using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Audit.Services;
using Learning.AggregateRoot.Domain.AuthentificationContext.Interfaces;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;
using Learning.AggregateRoot.Domain.Exceptions;

namespace Learning.AggregateRoot.Infrastructure.CQRS
{
    /// <summary>
    /// Gère vos racines d'aggrégats trackées, on en a besoin lors du save changes pour qu'ils puissent récupérer tous les évènements des aggrégats modifiées.
    /// </summary>
    public class Session<TAggregate> : Session<TAggregate, IRepository<TAggregate>>
        where TAggregate : Domain.CQRS.AggregateRoot
    {
        public Session(IRepository<TAggregate> repository, IAuthentificationContext authentificationContext, IMediator mediator, IDatabaseChangesAuditService databaseChangesAuditService) :
            base(repository, authentificationContext, mediator, databaseChangesAuditService) { }
    }
    public class Session<TAggregate, TRepository> : ISession<TAggregate, TRepository>
        where TAggregate : Domain.CQRS.AggregateRoot
        where TRepository : IRepository<TAggregate>
    {
        private readonly IAuthentificationContext _authentificationContext;
        private readonly IMediator _mediator;
        private readonly IDatabaseChangesAuditService _databaseChangesAuditService;
        private readonly ConcurrentDictionary<Guid, Domain.CQRS.AggregateRoot> _trackedAggregates = new ConcurrentDictionary<Guid, Domain.CQRS.AggregateRoot>();

        public TRepository Repository { get; }
        public IUnitOfWork UnitOfWork => Repository.UnitOfWork;
        public IQueryable<TAggregate> Queryable => Repository.Queryable;

        public Session(TRepository repository, IAuthentificationContext authentificationContext, IMediator mediator, IDatabaseChangesAuditService databaseChangesAuditService)
        {
            Repository = repository;
            _authentificationContext = authentificationContext;
            _mediator = mediator;
            _databaseChangesAuditService = databaseChangesAuditService;
        }

        public void Track(TAggregate aggregate)
        {
            if (aggregate is null)
                throw new ArgumentNullException(nameof(aggregate));

            _trackedAggregates.AddOrUpdate(aggregate.Id, aggregate, (key, value) => aggregate);
        }

        public void UnTrack(TAggregate aggregate)
        {
            if (aggregate is null)
                throw new ArgumentNullException(nameof(aggregate));

            _trackedAggregates.TryRemove(aggregate.Id, out _);
        }

        private TAggregate InternalGet(Func<TAggregate> getAggregate, Guid id)
        {
            var aggregate = _trackedAggregates.OfType<TAggregate>().SingleOrDefault(t => t.Id == id);

            if (aggregate != null)
                return aggregate;

            aggregate = getAggregate();

            if (aggregate is null)
                throw new AggregateNotFoundException(id);

            Track(aggregate);

            return aggregate;
        }

        public TAggregate Get(Guid id) => InternalGet(() => Repository.Get<TAggregate>(id), id);
        public TAggregate Get<TPropertyIncluded>(Guid id, params Expression<Func<TAggregate, IEnumerable<TPropertyIncluded>>>[] includes) => InternalGet(() => Repository.Get(id, includes), id);
        public TAggregate GetActive(Guid id) => InternalGet(() => Repository.GetActive<TAggregate>(id), id);
        public TAggregate GetActive<TPropertyIncluded>(Guid id, params Expression<Func<TAggregate, IEnumerable<TPropertyIncluded>>>[] includes) => InternalGet(() => Repository.GetActive(id, includes), id);

        public IQueryable<TAggregate> Search() => Repository.Search();
        public IQueryable<TAggregate> Search<TPropertyIncluded>(params Expression<Func<TAggregate, IEnumerable<TPropertyIncluded>>>[] includes) => Repository.Search(includes);
        public IQueryable<TAggregate> SearchActive() => Repository.SearchActive();
        public IQueryable<TAggregate> SearchActive<TProperty>(params Expression<Func<TAggregate, IEnumerable<TProperty>>>[] includes) => Repository.SearchActive(includes);

        public void Add(TAggregate aggregate)
        {
            if (aggregate is null)
                throw new ArgumentNullException(nameof(aggregate));

            aggregate.MarkAsCreated(_authentificationContext);
            Repository.Add(aggregate);

            Track(aggregate);
        }

        public void Update(TAggregate aggregate)
        {
            if (aggregate is null)
                throw new ArgumentNullException(nameof(aggregate));

            if (!_trackedAggregates.ContainsKey(aggregate.Id))
                throw new AggregateNotFoundException(aggregate.Id);

            Repository.Update(aggregate);

            Track(aggregate);
        }

        public void Remove(TAggregate aggregate)
        {
            if (aggregate is null)
                throw new ArgumentNullException(nameof(aggregate));

            if (!_trackedAggregates.ContainsKey(aggregate.Id))
                throw new AggregateNotFoundException(aggregate.Id);

            Repository.Remove(aggregate);

            Track(aggregate);
        }

        public async Task<IReadOnlyCollection<IEvent>> SaveChanges()
        {
            var aggregates = _trackedAggregates.Values.ToList();
            var events = aggregates.SelectMany(a => a.FlushEvents()).ToList();

            foreach (var aggregate in aggregates)
                aggregate.MarkAsUpdated(_authentificationContext);

            foreach (var @event in events)
                @event.CorrelationId = _authentificationContext.CorrelationId;

            await _mediator.PublishEvents(events);
            await _databaseChangesAuditService.Audit();
            await Repository.UnitOfWork.SaveChangesAsync();
            
            _trackedAggregates.Clear();

            return events;
        }
    }
}
