namespace Authentication.Requests
{
    public class LogoutRequest
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}