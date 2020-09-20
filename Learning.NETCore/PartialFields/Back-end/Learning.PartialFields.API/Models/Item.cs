using System.Collections.Generic;

namespace Learning.PartialFields.API.Models
{
    public class Item
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<ItemAttribute> Attributes { get; set; }
        public ItemImage Image { get; set; }
        public ItemLocation Location { get; set; }
    }

    public class ItemAttribute
    {
        public string Name { get; set; }
        public int Value { get; set; }
    }

    public class ItemImage
    {
        public string Path { get; set; }
        public string Area { get; set; }
    }

    public class ItemLocation
    {
        public int Act { get; set; }
        public string Zone { get; set; }
    }
}