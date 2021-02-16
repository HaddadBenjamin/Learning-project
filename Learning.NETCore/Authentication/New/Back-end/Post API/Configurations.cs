namespace Post.Configurations
{
    public class WriteModelConfiguration
    {
        public string ConnectionString { get; set; }
    }

    public class AuthenticationConfiguration
    {
        public string Url { get; set; }
        public string Secret { get; set; }
    }
}