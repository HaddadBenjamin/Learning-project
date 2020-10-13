using System;
using Learning.AggregateRoot.Application.Example.Dtos;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;
using Learning.AggregateRoot.Domain.ExampleToDelete.Commands;
using Learning.AggregateRoot.Domain.ExampleToDelete.Readers;
using Microsoft.AspNetCore.Mvc;

namespace Learning.AggregateRoot.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IItemReader _itemReader;

        public ItemsController(IMediator mediator, IItemReader itemReader)
        {
            _mediator = mediator;
            _itemReader = itemReader;
        }

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
        public IActionResult Get([FromRoute] Guid itemId) => Ok(_itemReader.Get(itemId));
    }
}
