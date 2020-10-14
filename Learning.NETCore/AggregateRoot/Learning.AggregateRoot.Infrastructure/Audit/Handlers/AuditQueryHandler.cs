using System.Threading;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Audit.Aggregates;
using Learning.AggregateRoot.Domain.Audit.Commands;
using Learning.AggregateRoot.Domain.Audit.Services;
using Learning.AggregateRoot.Domain.AuthentificationContext;
using Learning.AggregateRoot.Infrastructure.Audit.DbContext;
using MediatR;

namespace Learning.AggregateRoot.Infrastructure.Audit.Handlers
{
    public class AuditQueryHandler : IRequestHandler<CreateAuditQuery>
    {
        private readonly IAuthentificationContext _authentificationContext;
        private readonly AuditDbContext _dbContext;
        private readonly IAuditSerializer _auditSerializer;

        public AuditQueryHandler(IAuthentificationContext authentificationContext, AuditDbContext dbContext, IAuditSerializer auditSerializer)
        {
            _authentificationContext = authentificationContext;
            _dbContext = dbContext;
            _auditSerializer = auditSerializer;
        }

        public async Task<Unit> Handle(CreateAuditQuery query, CancellationToken cancellationToken)
        {
            var auditQuery = AuditQuery.Create(query, _authentificationContext, _auditSerializer);

            _dbContext.AuditQueries.Add(auditQuery);
            await _dbContext.SaveChangesAsync();

            return Unit.Value;
        }
    }
}