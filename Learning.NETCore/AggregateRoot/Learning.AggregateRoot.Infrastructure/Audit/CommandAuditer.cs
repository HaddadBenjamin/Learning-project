using System;
using Learning.AggregateRoot.Domain.Audit;
using Learning.AggregateRoot.Domain.Interfaces.Audit;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;
using Learning.AggregateRoot.Infrastructure.DbContext.Audit;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace Learning.AggregateRoot.Infrastructure.Audit
{
    public class CommandAuditer : ICommandAuditer
    {
        private readonly IAuthentificationContext _authentificationContext;
        private readonly AuditDbContext _dbContext;

        public CommandAuditer(IAuthentificationContext authentificationContext, IServiceScopeFactory serviceScopeFactory)
        {
            _authentificationContext = authentificationContext;
            _dbContext = serviceScopeFactory.CreateScope().ServiceProvider.GetService<AuditDbContext>();
        }

        public void Audit(ICommand command)
        {
            var auditCommand = ToAuditCommand(command);

            _dbContext.AuditCommands.Add(auditCommand);
            _dbContext.SaveChanges();
        }

        private AuditCommand ToAuditCommand(ICommand command) => new AuditCommand
        {
            Id = Guid.NewGuid(),
            CommandName = command.GetType().UnderlyingSystemType.Name,
            Command = JsonConvert.SerializeObject(command, Formatting.Indented),
            CorrelationId = _authentificationContext.CorrelationId,
            Date = DateTime.UtcNow,
            ImpersonatedUserId = _authentificationContext.ImpersonatedUser.Id,
            UserId = _authentificationContext.User.Id
        };
    }
}