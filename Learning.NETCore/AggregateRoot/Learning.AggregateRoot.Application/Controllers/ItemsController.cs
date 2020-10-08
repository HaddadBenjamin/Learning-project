using System;
using System.Collections.Generic;
using Learning.AggregateRoot.Application.Example.Dtos;
using Learning.AggregateRoot.Domain.Example.Commands;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;
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
        public IActionResult Get()
        {
            var command = new CreateItem
            {
                Name = "test",
                Locations = new List<string>() { "act I", "act II" }
            };

            _mediator.SendCommand(command);

            return Ok("yo");
        }
    }
}