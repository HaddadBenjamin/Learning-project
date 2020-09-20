using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Learning.Mediator.AspNetCore.Example.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WhatElseController : ControllerBase
    {
        private readonly IMediator _mediator;

        public WhatElseController(IMediator mediator) => _mediator = mediator;

        [HttpGet]
        public async Task Get()
        {
            var result = string.Empty;

            result = _mediator.Send(new CommandWithResponse());
            result = await _mediator.SendAsync(new CommandWithResponse());
           
            _mediator.Send(new Command());
            await _mediator.SendAsync(new Command());

            result = _mediator.Send(new Query());
            result = await _mediator.SendAsync(new Query());

           _mediator.Send(new Event());
           await _mediator.SendAsync(new Event());
        }
    }

    #region Write
    public class Command : ICommand { }
    public class CommandWithResponse : ICommand<string> { }

    public class CommandHandler :
        ICommandHandler<Command>,
        ICommandHandlerAsync<Command>,
        ICommandHandler<CommandWithResponse, string>,
        ICommandHandlerAsync<CommandWithResponse, string>
    {
        void ICommandHandler<Command>.Handle(Command command) { }

        async Task ICommandHandlerAsync<Command>.Handle(Command command) { }

        string ICommandHandler<CommandWithResponse, string>.Handle(CommandWithResponse command) => "synchronous command";

        async Task<string> ICommandHandlerAsync<CommandWithResponse, string>.Handle(CommandWithResponse command) => "asynchronous command";
    }
    #endregion

    #region Read
    public class Query : IQuery<string> { }

    public class QueryHandler :
        IQueryHandler<Query, string>,
        IQueryHandlerAsync<Query, string>
    {
        public string Handle(Query query) => "synchronous query";

        async Task<string> IQueryHandlerAsync<Query, string>.Handle(Query query) => "asynchronous query";
    }
    #endregion

    #region Event
    public class Event : IEvent { }

    public class EventHandler :
        IEventHandler<Event>,
        IEventHandlerAsync<Event>
    {
        public void Handle(Event @event) { }

        async Task IEventHandlerAsync<Event>.Handle(Event @event) { }
    }
    #endregion
}
