namespace Learning.AggregateRoot.Application.Example.Dtos
{
    public class UpdateItemDto : CreateItemDto
    {
        public string Name { get; set; }
        public string Locations { get; set; }
    }
}