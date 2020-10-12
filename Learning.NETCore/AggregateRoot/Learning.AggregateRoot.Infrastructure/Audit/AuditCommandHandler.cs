using System.Threading;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Audit.Aggregates;
using Learning.AggregateRoot.Domain.Audit.Commands;
using Learning.AggregateRoot.Domain.AuthentificationContext.Interfaces;
using Learning.AggregateRoot.Infrastructure.DbContext.Audit;
using MediatR;

namespace Learning.AggregateRoot.Infrastructure.Audit
{
    public class AuditCommandHandler : IRequestHandler<CreateAuditCommand>
    {
        private readonly IAuthentificationContext _authentificationContext;
        private readonly AuditDbContext _dbContext;

        public AuditCommandHandler(IAuthentificationContext authentificationContext, AuditDbContext dbContext)
        {
            _authentificationContext = authentificationContext;
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(CreateAuditCommand command, CancellationToken cancellationToken)
        {
            var auditCommand = new AuditCommand().Create(command, _authentificationContext);

            _dbContext.AuditCommands.Add(auditCommand);
            await _dbContext.SaveChangesAsync();

            return Unit.Value;
        }
    }
}