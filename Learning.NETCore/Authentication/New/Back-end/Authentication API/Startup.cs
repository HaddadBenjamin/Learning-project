using System;
using System.IO;
using System.Reflection;
using System.Text;
using Authentication.Configurations;
using Authentication.Exceptions;
using Authentication.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;

namespace Authentication
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration) => _configuration = configuration;

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc(config =>
                {
                    var mustBeLoggedPolicy = new AuthorizationPolicyBuilder()
                        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                        .RequireAuthenticatedUser()
                        .Build();

                    config.Filters.Add(new AuthorizeFilter(mustBeLoggedPolicy));
                    config.Filters.Add(new ExceptionHandlerFilter());
                })
                .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            services
                .AddCors()
                .AddRouting(options => options.LowercaseUrls = true);

            // Authentication
            var jwtConfiguration = _configuration.GetSection("Jwt").Get<JwtConfiguration>();
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtConfiguration.Secret)),
                ValidateIssuer = false,
                ValidateAudience = false,
                RequireExpirationTime = false,
                ValidateLifetime = true,
            };

            services
                .AddSingleton(jwtConfiguration)
                .AddSingleton(tokenValidationParameters)
                .AddAuthentication(_ => _.DefaultAuthenticateScheme = _.DefaultScheme = _.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(_ =>
                {
                    _.SaveToken = true;
                    _.TokenValidationParameters = tokenValidationParameters;
                });

            // Database 
            services
               .AddIdentity<ApplicationUser, IdentityRole>()
               .AddEntityFrameworkStores<ApplicationDbContext>()
               .AddSignInManager<SignInManager<ApplicationUser>>();

            var writeModelConfiguration = _configuration.GetSection("WriteModel").Get<WriteModelConfiguration>();

            services
                .AddSingleton(writeModelConfiguration)
                .AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(writeModelConfiguration.ConnectionString));

            // Swagger
            services.AddSwaggerGen(_ =>
            {
                _.SwaggerDoc("v1", new OpenApiInfo { Title = "Authentification", Version = "v1" });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                _.IncludeXmlComments(xmlPath);

                _.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme."
                });
                _.AddSecurityRequirement(new OpenApiSecurityRequirement {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] {}
                }});
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app
                    .UseDeveloperExceptionPage()
                    .UseSwagger()
                    .UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Authentification v1"));
            }

            app
                .UseHttpsRedirection()
                .UseRouting()
                .UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader())

                .UseAuthentication()
                .UseAuthorization()

                .UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }

}
