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
            var mapper = new ItemDtoPartialGetMapper(fieldsToMap);

            return Items.Select(mapper.Map);
        }

        [HttpPut]
        [Route("update/{itemId}")]
        public void Update(UpdateItemDto dto, [FromRoute] string itemId)
        {
            var items = Items.ToList();
            var fieldsToUpdate = new PartialFields(dto.FieldsToUpdate);
            var mapper = new ItemDtoPartialUpdateMapper(fieldsToUpdate);
            var item = items.First(_ => _.Id == itemId);

            mapper.Map(dto, item);

            WriteAllText("Resources/items.json", JsonConvert.SerializeObject(items, Formatting.Indented));
        }
    }

    #region Partial Get
    public class SearchItemDto : IPartialGetDto
    {
        public string FieldsToRetrieve { get; set; }
    }

    public class ItemDtoPartialGetMapper : PartialMapper<Item, ItemDto>
    {
        public ItemDtoPartialGetMapper(IPartialFields fieldsToMap) : base(fieldsToMap) =>
            AddMappers(
                ("name", ((source, destination) => destination.Name = $"{source.Name}-{source.Id}"))
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

    #region Partial Update
    public class UpdateItemDto : IPartialUpdateDto
    {
        public string FieldsToUpdate { get; set; }
        public string Name { get; set; }
        public IEnumerable<ItemAttribute> Attributes { get; set; }
        public ItemImage Image { get; set; }
        public ItemLocation Location { get; set; }
    }

    public class ItemDtoPartialUpdateMapper : PartialMapper<UpdateItemDto, Item>
    {
        public ItemDtoPartialUpdateMapper(IPartialFields fieldsToMap) : base(fieldsToMap) =>
            AddMappers(
                ("name", ((source, destination) => destination.Name = $"{source.Name}-{source.Location.Act}-{source.Location.Zone}"))
            );
    }
    #endregion
}
