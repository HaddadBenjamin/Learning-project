using System.Threading;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;
using Learning.AggregateRoot.Domain.ExampleToDelete.Aggregates;
using Learning.AggregateRoot.Domain.ExampleToDelete.Builders;
using Learning.AggregateRoot.Domain.ExampleToDelete.Queries;
using Learning.AggregateRoot.Domain.ExampleToDelete.Repositories;
using Learning.AggregateRoot.Domain.ExampleToDelete.Views;
using MediatR;

namespace Learning.AggregateRoot.Infrastructure.ExampleToRemove.QueryHandlers
{
    public class ItemQueryHandler :
        IRequestHandler<GetItem, ItemView>,
        IRequestHandler<GetItemByName, ItemView>
    {
        private readonly ISession<Item, IItemRepository> _session;
        private readonly IItemViewMapper _itemViewMapper;

        public ItemQueryHandler(ISession<Item, IItemRepository> session, IItemViewMapper itemViewMapper)
        {
            _session = session;
            _itemViewMapper = itemViewMapper;
        }

        public async Task<ItemView> Handle(GetItem query, CancellationToken cancellationToken)
        {
            var item = _session.GetActive(query.Id, _ => _.Locations);

            return _itemViewMapper.Map(item);
        }

        public async Task<ItemView> Handle(GetItemByName query, CancellationToken cancellationToken)
        {
            var item = _session.Repository.GetByName(query.Name);

            return _itemViewMapper.Map(item);
        }
    }
}