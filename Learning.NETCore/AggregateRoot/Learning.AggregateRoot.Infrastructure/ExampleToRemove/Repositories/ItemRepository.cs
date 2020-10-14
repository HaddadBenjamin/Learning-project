using System.Linq;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;
using Learning.AggregateRoot.Domain.ExampleToDelete.Aggregates;
using Learning.AggregateRoot.Domain.ExampleToDelete.Repositories;
using Learning.AggregateRoot.Infrastructure.ExampleToRedefine.CQRS;
using Learning.AggregateRoot.Infrastructure.ExampleToRedefine.DbContext;
using Microsoft.EntityFrameworkCore;

namespace Learning.AggregateRoot.Infrastructure.ExampleToRemove.Repositories
{
    public class ItemRepository : GenericRepository<Item>, IItemRepository
    {
        public ItemRepository(YourDbContext context, IUnitOfWork unitOfWork) : base(context, unitOfWork) {}
      
        public Item GetByName(string name) => Queryable
            .Include(i => i.Locations)
            .FirstOrDefault(i => i.Name == name && i.IsActive);
    }
}
