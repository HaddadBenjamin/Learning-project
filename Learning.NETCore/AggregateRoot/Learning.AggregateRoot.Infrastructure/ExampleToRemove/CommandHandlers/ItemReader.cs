using System;
using System.Linq;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;
using Learning.AggregateRoot.Domain.ExampleToDelete.Aggregates;
using Learning.AggregateRoot.Domain.ExampleToDelete.Readers;
using Learning.AggregateRoot.Domain.ExampleToDelete.Views;

namespace Learning.AggregateRoot.Infrastructure.ExampleToRemove.CommandHandlers
{
    public class ItemReader : IItemReader
    {
        // TODO use ISession<Item> instead of ISession<Item, IRepository<Item>>.
        private readonly ISession<Item, IRepository<Item>> _session;

        public ItemReader(ISession<Item, IRepository<Item>> session) => _session = session;
        
        public ItemView Get(Guid id)
        {
            var item = _session.GetActive(id, _ => _.Locations);

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