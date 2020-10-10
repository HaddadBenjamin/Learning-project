using System;
using Learning.AggregateRoot.Domain;
using Learning.AggregateRoot.Domain.Interfaces.Audit;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;
using Learning.AggregateRoot.Infrastructure.Example.DbContext;
using Newtonsoft.Json;

namespace Learning.AggregateRoot.Infrastructure.Audit
{
    public class CommandAuditer : ICommandAuditer
    {
        private readonly IAuthentificationContext _authentificationContext;
        private readonly YourDbContext _dbContext;

        public CommandAuditer(IAuthentificationContext authentificationContext, YourDbContext dbContext)
        {
            _authentificationContext = authentificationContext;
            _dbContext = dbContext;
        }

        public void Audit(ICommand command)
        {
            var auditCommand = new AuditCommand
            {
                Id = Guid.NewGuid(),
                CommandName = command.GetType().UnderlyingSystemType.Name,
                Command = JsonConvert.SerializeObject(command, Formatting.Indented),
                CorrelationId = _authentificationContext.CorrelationId,
                Date = DateTime.UtcNow,
                ImpersonatedUserId = _authentificationContext.ImpersonatedUser.Id,
                UserId = _authentificationContext.User.Id
            };

            _dbContext.AuditCommands.Add(auditCommand);
        }
    }
}