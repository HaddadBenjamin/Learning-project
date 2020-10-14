using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;
using Learning.AggregateRoot.Domain.ExampleToDelete.Aggregates;
using Learning.AggregateRoot.Domain.ExampleToDelete.Queries;
using Learning.AggregateRoot.Domain.ExampleToDelete.Views;
using MediatR;

namespace Learning.AggregateRoot.Infrastructure.ExampleToRemove.QueryHandlers
{
    public class ItemQueryHandler : IRequestHandler<GetItem, ItemView>
    {
        private readonly ISession<Item> _session;

        public ItemQueryHandler(ISession<Item> session) => _session = session;
        
        public async Task<ItemView> Handle(GetItem query, CancellationToken cancellationToken)
        {
            var item = _session.GetActive(query.Id, _ => _.Locations);

            return new ItemView
            {
                Id = item.Id,
                Name = item.Name,
                Locations = item.Locations.Select(l => new ItemLocationView
                {
                    Id = l.Id,
                    Name = l.Name
                })
            };
        }
    }
}