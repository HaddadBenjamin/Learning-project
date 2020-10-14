using System;
using System.Threading.Tasks;
using Learning.AggregateRoot.Application.Example.Dtos;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;
using Learning.AggregateRoot.Domain.ExampleToDelete.Commands;
using Learning.AggregateRoot.Domain.ExampleToDelete.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Learning.AggregateRoot.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ItemsController(IMediator mediator) => _mediator = mediator;

        [HttpPost]
        public IActionResult Create([FromBody]CreateItemDto dto)
        {
            var command = new CreateItem
            {
                Name = dto.Name,
                Locations = dto.Locations.Split(',')
            };

            _mediator.SendCommand(command);

            return Ok();
        }

        [HttpPut]
        [Route("{itemId:guid}")]
        public IActionResult Update(UpdateItemDto dto, [FromRoute] Guid itemId)
        {
            var command = new UpdateItem
            {
                Id = itemId,
                Name = dto.Name,
                Locations = dto.Locations.Split(',')
            };

            _mediator.SendCommand(command);

            return Ok();
        }

        [HttpDelete]
        [Route("{itemId:guid}")]
        public IActionResult Delete([FromRoute] Guid itemId)
        {
            var command = new DeleteItem { Id = itemId };

            _mediator.SendCommand(command);

            return Ok();
        }

        [HttpGet]
        [Route("{itemId:guid}")]
        public async Task<IActionResult> Get([FromRoute] Guid itemId) => Ok(await _mediator.SendQuery(new GetItem { Id = itemId }));

        [HttpGet]
        public async Task<IActionResult> GetByName([FromQuery] string name) => Ok(await _mediator.SendQuery(new GetItemByName { Name = name }));
    }
}
