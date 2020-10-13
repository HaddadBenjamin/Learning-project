using System.Threading;
using System.Threading.Tasks;
using EFCore.BulkExtensions;
using Learning.AggregateRoot.Domain.Audit.Aggregates;
using Learning.AggregateRoot.Domain.Audit.Commands;
using Learning.AggregateRoot.Domain.Audit.Services;
using Learning.AggregateRoot.Domain.AuthentificationContext;
using Learning.AggregateRoot.Infrastructure.Audit.DbContext.Audit;
using MediatR;

namespace Learning.AggregateRoot.Infrastructure.Audit.Handlers
{
    public class AuditEventHandler : IRequestHandler<CreateAuditEvents>
    {
        private readonly IAuthentificationContext _authentificationContext;
        private readonly AuditDbContext _dbContext;
        private readonly IAuditSerializer _auditSerializer;

        public AuditEventHandler(IAuthentificationContext authentificationContext, AuditDbContext auditDbContext, IAuditSerializer auditSerializer)
        {
            _authentificationContext = authentificationContext;
            _dbContext = auditDbContext;
            _auditSerializer = auditSerializer;
        }

        public async Task<Unit> Handle(CreateAuditEvents command, CancellationToken cancellationToken)
        {
            var auditEvents = AuditEvent.Create(command, _authentificationContext, _auditSerializer);

            await _dbContext.BulkInsertAsync(auditEvents);
            await _dbContext.SaveChangesAsync();

            return Unit.Value;
        }
    }
}