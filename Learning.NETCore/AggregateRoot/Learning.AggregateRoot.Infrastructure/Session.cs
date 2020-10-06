using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Exceptions;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;

namespace Learning.AggregateRoot.Infrastructure
{
    /// <summary>
    /// Gère vos racines d'aggrégats trackées, on en a besoin lors du save changes pour qu'ils puissent récupérer tous les évènements des aggrégats modifiées.
    /// </summary>
    public class Session<TAggregate> : Session<TAggregate, IRepository<TAggregate>>
        where TAggregate : Domain.AggregateRoot
    {
        public Session(IRepository<TAggregate> repository, IAuthentificationContext authentificationContext, IMediator mediator) : base(repository, authentificationContext, mediator)
        { }
    }
    public class Session<TAggregate, TRepository> : ISession<TAggregate, TRepository>
        where TAggregate : Domain.AggregateRoot
        where TRepository : IRepository<TAggregate>
    {
        private readonly TRepository _repository;
        private readonly IAuthentificationContext _authentificationContext;
        private readonly IMediator _mediator;
        private readonly ConcurrentDictionary<Guid, Domain.AggregateRoot> _trackedAggregates = new ConcurrentDictionary<Guid, Domain.AggregateRoot>();

        public TRepository Repository => _repository;

        public Session(TRepository repository, IAuthentificationContext authentificationContext, IMediator mediator)
        {
            _repository = repository;
            _authentificationContext = authentificationContext;
            _mediator = mediator;
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

        public TAggregate Get<TProperty>(Guid id, params Expression<Func<TAggregate, IEnumerable<TProperty>>>[] includes)
        {
            var aggregate = _trackedAggregates.OfType<TAggregate>().SingleOrDefault(t => t.Id == id);

            if (aggregate != null)
                return aggregate;

            aggregate = Repository.Get(id, includes);

            if (aggregate is null)
                throw new AggregateNotFoundException(id);

            Track(aggregate);

            return aggregate;
        }

        public IQueryable<TAggregate> Search<TProperty>(params Expression<Func<TAggregate, IEnumerable<TProperty>>>[] includes) =>
            _repository.Search(includes);

        public void Add(TAggregate aggregate)
        {
            if (aggregate is null)
                throw new ArgumentNullException(nameof(aggregate));

            aggregate.MarkAsCreated(_authentificationContext);
            _repository.Add(aggregate);

            Track(aggregate);
        }

        public void Update(TAggregate aggregate)
        {
            if (aggregate is null)
                throw new ArgumentNullException(nameof(aggregate));

            if (!_trackedAggregates.ContainsKey(aggregate.Id))
                throw new AggregateNotFoundException(aggregate.Id);

            _repository.Update(aggregate);

            Track(aggregate);
        }

        public void Remove(TAggregate aggregate)
        {
            if (aggregate is null)
                throw new ArgumentNullException(nameof(aggregate));

            if (!_trackedAggregates.ContainsKey(aggregate.Id))
                throw new AggregateNotFoundException(aggregate.Id);

            _repository.Remove(aggregate);

            Track(aggregate);
        }

        public async Task<IReadOnlyCollection<IEvent>> SaveChanges()
        {
            var aggregates = _trackedAggregates.Values.ToList();

            foreach (var aggregate in aggregates)
                aggregate.MarkAsUpdated(_authentificationContext);

            await _repository.SaveChanges();

            _trackedAggregates.Clear();

            var events = aggregates.SelectMany(a => a.FlushEvents()).ToList();

            foreach (var @event in events)
                @event.CorrelationId = _authentificationContext.CorrelationId;

            await Task.WhenAll(events.Select(_mediator.PublishEvent));

            return events;
        }
    }
}
