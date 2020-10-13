using Learning.AggregateRoot.Application.Filters;
using Learning.AggregateRoot.Domain.Audit.Configuration;
using Learning.AggregateRoot.Domain.Audit.Services;
using Learning.AggregateRoot.Domain.AuthentificationContext;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;
using Learning.AggregateRoot.Infrastructure.Audit.DbContext;
using Learning.AggregateRoot.Infrastructure.Audit.Services;
using Learning.AggregateRoot.Infrastructure.AuthentificationContext;
using Learning.AggregateRoot.Infrastructure.CQRS;
using Learning.AggregateRoot.Infrastructure.ExampleToRedefine.Audit;
using Learning.AggregateRoot.Infrastructure.ExampleToRedefine.AuthentificationContext;
using Learning.AggregateRoot.Infrastructure.ExampleToRedefine.CQRS;
using Learning.AggregateRoot.Infrastructure.ExampleToRedefine.DbContext;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using IMediator = Learning.AggregateRoot.Domain.CQRS.Interfaces.IMediator;
using Mediator = Learning.AggregateRoot.Infrastructure.CQRS.Mediator;

namespace Learning.AggregateRoot.Application
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration  configuration) => _configuration = configuration;

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(options =>
            {
                options.EnableEndpointRouting = false;
                options.Filters.Add(new ExceptionHandlerFilter());
            });

            services
                // Register CQRS : mediator / session / repository / unit of work.
                .AddMediatR(typeof(Mediator))
                .AddScoped<IMediator, Mediator>()
                .AddScoped(typeof(ISession<>), typeof(Session<>))
                .AddScoped(typeof(ISession<,>), typeof(Session<,>))
                // Pour l'example, il faudra les redéfinir.
                .AddScoped<IUnitOfWork, GenericUnitOfWork>()
                .AddScoped(typeof(IRepository<>), typeof(GenericRepository<>))
                // Register authentification context.
                .AddSingleton<IHttpContextAccessor, HttpContextAccessor>()
                .AddScoped<IRequestContext, RequestContext>()
                .AddScoped<IAuthentificationContext, AuthentificationContext>()
                // Audit
                .AddSingleton(_configuration.GetSection("Audit").Get<AuditConfiguration>())
                .AddScoped<IAuditSerializer, AuditSerializer>()
                // Pour l'example, il faudra les redéfinir.
                .AddScoped<IDatabaseChangesAuditService, GenericsDatabaseChangesAuditService>()
                // Register Db context.
                .AddDbContextPool<AuditDbContext>(options => options.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Audit;Trusted_Connection=True;MultipleActiveResultSets=true"))
                .AddDbContextPool<YourDbContext>(options => options.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=AggregateRoot;Trusted_Connection=True;MultipleActiveResultSets=true"))
                // Exemple : il faudra créer une nouvelle implémentation de IAuthentificationContextUserProvider.
                .AddScoped<IAuthentificationContextUserProvider, FakeAuthentificationContextUserProvider>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                // Il faudra mettre votre DbContext ici.
                serviceScope.ServiceProvider.GetRequiredService<YourDbContext>().Database.Migrate();
                serviceScope.ServiceProvider.GetRequiredService<AuditDbContext>().Database.Migrate();
            }

            app.UseMvc();
        }
    }
}
