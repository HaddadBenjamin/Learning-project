using System.Threading;
using System.Threading.Tasks;
using EFCore.BulkExtensions;
using Learning.AggregateRoot.Domain.Audit.Aggregates;
using Learning.AggregateRoot.Domain.Audit.Commands;
using Learning.AggregateRoot.Domain.AuthentificationContext.Interfaces;
using Learning.AggregateRoot.Infrastructure.DbContext.Audit;
using MediatR;

namespace Learning.AggregateRoot.Infrastructure.Audit
{
    public class AuditEventHandler : IRequestHandler<CreateAuditEvents>
    {
        private readonly IAuthentificationContext _authentificationContext;
        private readonly AuditDbContext _dbContext;

        public AuditEventHandler(IAuthentificationContext authentificationContext, AuditDbContext auditDbContext)
        {
            _authentificationContext = authentificationContext;
            _dbContext = auditDbContext;
        }

        public async Task<Unit> Handle(CreateAuditEvents command, CancellationToken cancellationToken)
        {
            var auditEvents = AuditEvent.Create(command, _authentificationContext);

            await _dbContext.BulkInsertAsync(auditEvents);
            await _dbContext.SaveChangesAsync();

            return Unit.Value;
        }
    }
}