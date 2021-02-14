using System;

namespace Authentication.Configurations
{
    public class JwtConfiguration
    { 
        public string Secret { get; set; }
        public TimeSpan AccessTokenLifetime { get; set; }
        public TimeSpan RefreshTokenLifetime { get; set; }
    }

    public class WriteModelConfiguration
    {
        public string ConnectionString { get; set; }
    }
}
