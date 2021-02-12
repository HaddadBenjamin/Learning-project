using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Authentication.DependenyInjections
{
    public class AuthenticationInjecter : IInjecter
    {
        public void InjectService(IServiceCollection services, IConfiguration configuration)
        {
            var jwtConfiguration = configuration.GetSection("Jwt").Get<JwtConfiguration>();
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtConfiguration.Secret)),
                ValidateIssuer = false,
                ValidateAudience = false,
                RequireExpirationTime = false,
                ValidateLifetime = true,
            };

            services.AddSingleton(jwtConfiguration);
            services.AddSingleton(tokenValidationParameters);
            services
                .AddAuthentication(_ => _.DefaultAuthenticateScheme = _.DefaultScheme = _.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(_ =>
                {
                    _.SaveToken = true;
                    _.TokenValidationParameters = tokenValidationParameters;
                });
        }
    }
}
