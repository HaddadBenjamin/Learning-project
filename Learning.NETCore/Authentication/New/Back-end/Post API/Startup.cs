using System;
using System.IO;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;
using Post.Authentication;
using Post.Configurations;
using Post.Exceptions;
using Post.Middlewares;
using Post.Persistence;
using Refit;

namespace Post
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
                .AddRouting(options => options.LowercaseUrls = true)
                .AddHttpContextAccessor();
            
            // Authentication
            var authenticationConfiguration = _configuration.GetSection("Authentication").Get<AuthenticationConfiguration>();

            services
                .AddSingleton(authenticationConfiguration)
                .AddAuthentication(_ => _.DefaultAuthenticateScheme = _.DefaultScheme = _.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(_ =>
                {
                    _.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(authenticationConfiguration.Secret)),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        RequireExpirationTime = false,
                        ValidateLifetime = false,
                        ClockSkew = TimeSpan.Zero
                    };
                    _.Events = new JwtBearerEvents
                    {
                        OnAuthenticationFailed = context =>
                        {
                            if (context.Exception is SecurityTokenExpiredException)
                                context.Response.Headers.Add("Token-Expired", "true");
                            return Task.CompletedTask;
                        }
                    };
                });

            services
                .AddScoped<IAuthenticationContext, AuthenticationContext>()
                .AddScoped<IUserApi, UserApi>()
                .AddRefitClient<IUserApiClient>()
                .ConfigureHttpClient(_ => _.BaseAddress = new Uri($"{authenticationConfiguration.Url}/user"));

            // Database 
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
                .UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().WithExposedHeaders("Token-Expired"))
                
                .UseAuthorization()

                .UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}
