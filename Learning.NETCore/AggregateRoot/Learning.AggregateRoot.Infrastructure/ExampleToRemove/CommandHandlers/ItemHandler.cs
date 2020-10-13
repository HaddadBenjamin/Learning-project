using System.Threading;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;
using Learning.AggregateRoot.Domain.ExampleToDelete.Aggregates;
using Learning.AggregateRoot.Domain.ExampleToDelete.Commands;
using MediatR;

namespace Learning.AggregateRoot.Infrastructure.ExampleToRemove.CommandHandlers
{
    public class ItemHandler :
        IRequestHandler<CreateItem>,
        IRequestHandler<UpdateItem>,
        IRequestHandler<DeleteItem>
    {
        // TODO use ISession<Item> instead of ISession<Item, IRepository<Item>>.
        private readonly ISession<Item, IRepository<Item>> _session;

        public ItemHandler(ISession<Item, IRepository<Item>> session) => _session = session;

        public async Task<Unit> Handle(CreateItem command, CancellationToken cancellationToken)
        {
            var aggregate = new Item().Create(command);

            _session.Add(aggregate);
            await _session.SaveChanges();

            return Unit.Value;
        }

        public async Task<Unit> Handle(UpdateItem command, CancellationToken cancellationToken)
        {
            var aggregate = _session.Get(command.Id, _ => _.Locations);

            aggregate.Update(command);

            await _session.SaveChanges();

            return Unit.Value;
        }

        public async Task<Unit> Handle(DeleteItem command, CancellationToken cancellationToken)
        {
            var aggregate = _session.Get(command.Id, _ => _.Locations);

            aggregate.Deactivate(command);

            await _session.SaveChanges();

            return Unit.Value;
        }
    }
}
