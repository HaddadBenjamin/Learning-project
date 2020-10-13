using System.Threading;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Audit.Aggregates;
using Learning.AggregateRoot.Domain.Audit.Commands;
using Learning.AggregateRoot.Domain.Audit.Services;
using Learning.AggregateRoot.Domain.AuthentificationContext.Interfaces;
using Learning.AggregateRoot.Infrastructure.DbContext.Audit;
using MediatR;

namespace Learning.AggregateRoot.Infrastructure.Audit
{
    public class AuditCommandHandler : IRequestHandler<CreateAuditCommand>
    {
        private readonly IAuthentificationContext _authentificationContext;
        private readonly AuditDbContext _dbContext;
        private readonly IAuditSerializer _auditSerializer;

        public AuditCommandHandler(IAuthentificationContext authentificationContext, AuditDbContext dbContext, IAuditSerializer auditSerializer)
        {
            _authentificationContext = authentificationContext;
            _dbContext = dbContext;
            _auditSerializer = auditSerializer;
        }

        public async Task<Unit> Handle(CreateAuditCommand command, CancellationToken cancellationToken)
        {
            var auditCommand = AuditCommand.Create(command, _authentificationContext, _auditSerializer);

            _dbContext.AuditCommands.Add(auditCommand);
            await _dbContext.SaveChangesAsync();

            return Unit.Value;
        }
    }
}