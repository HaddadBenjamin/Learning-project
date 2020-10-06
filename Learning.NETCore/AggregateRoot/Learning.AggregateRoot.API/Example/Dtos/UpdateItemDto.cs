namespace Learning.AggregateRoot.API.Example.Dtos
{
    public class UpdateItemDto : CreateItemDto
    {
        public string Name { get; set; }
        public string Locations { get; set; }
    }
}