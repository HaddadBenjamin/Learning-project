using System.Collections.Generic;
using System.Linq;
using Learning.PartialFields.API.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using static System.IO.File;

namespace Learning.PartialFields.API.Controllers
{
    [ApiController]
    [Route("items")]
    public class ItemsController : ControllerBase
    {
        private IEnumerable<Item> Items = JsonConvert.DeserializeObject<IEnumerable<Item>>(ReadAllText("Resources/items.json"));

        [HttpGet]
        public IEnumerable<ItemDto> Search(SearchItemDto dto)
        {
            var fieldsToMap = new PartialFields(dto.FieldsToRetrieve, "id,name");
            var itemDtoMapper = new ItemDtoMapper(fieldsToMap);

            return Items.Select(itemDtoMapper.Map);
        }
    }

    #region Partial Get
    public class SearchItemDto : IPartialGet
    {
        public string FieldsToRetrieve { get; set; }
    }

    public class ItemDtoMapper : PartialMapper<Item, ItemDto>
    {
        public ItemDtoMapper(IPartialFields fieldsToMap) : base(fieldsToMap) =>
            AddMappers(
                ("location", ((source, destination) => destination.Name = $"{source.Name}-{source.Id}"))
            );
    }

    public class ItemDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<ItemAttribute> Attributes { get; set; }
        public ItemImage Image { get; set; }
        public ItemLocation Location { get; set; }
    }
    #endregion
}
