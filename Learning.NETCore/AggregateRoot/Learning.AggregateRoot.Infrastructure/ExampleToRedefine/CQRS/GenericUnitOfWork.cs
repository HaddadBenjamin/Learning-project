﻿using Learning.AggregateRoot.Domain.Audit.Services;
using Learning.AggregateRoot.Infrastructure.CQRS;
using Learning.AggregateRoot.Infrastructure.ExampleToRedefine.DbContext;

namespace Learning.AggregateRoot.Infrastructure.ExampleToRedefine.CQRS
{
    public class GenericUnitOfWork : UnitOfWork<YourDbContext>
    {
        public GenericUnitOfWork(YourDbContext dbContext, IDatabaseChangesAuditService databaseChangesAuditService) : base(dbContext, databaseChangesAuditService) { }
    }
}