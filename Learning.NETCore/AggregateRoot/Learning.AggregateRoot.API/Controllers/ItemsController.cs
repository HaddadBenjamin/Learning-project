using System;
using Learning.AggregateRoot.API.Example.Dtos;
using Learning.AggregateRoot.Domain.Example.Commands;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;
using Microsoft.AspNetCore.Mvc;

namespace Learning.AggregateRoot.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ItemsController(IMediator mediator) => _mediator = mediator;

        [HttpPost]
        public IActionResult Create(CreateItemDto dto)
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
    }
}