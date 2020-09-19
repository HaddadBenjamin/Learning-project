namespace Learning.PartialFields.API.Models
{
    public class User
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public UserAddress Address { get; set; }
    }

    public class UserAddress
    {
        public string City { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string Street { get; set; }
    }
}