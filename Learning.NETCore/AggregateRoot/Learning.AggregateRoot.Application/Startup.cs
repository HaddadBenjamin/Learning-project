using Learning.AggregateRoot.Application.Filters;
using Learning.AggregateRoot.Domain.Audit.Services;
using Learning.AggregateRoot.Domain.AuthentificationContext.Interfaces;
using Learning.AggregateRoot.Domain.CQRS.Interfaces;
using Learning.AggregateRoot.Domain.Example.Readers;
using Learning.AggregateRoot.Infrastructure.Audit;
using Learning.AggregateRoot.Infrastructure.AuthentificationContext;
using Learning.AggregateRoot.Infrastructure.CQRS;
using Learning.AggregateRoot.Infrastructure.DbContext.Audit;
using Learning.AggregateRoot.Infrastructure.Example.AuthentificationContext;
using Learning.AggregateRoot.Infrastructure.Example.CommandHandlers;
using Learning.AggregateRoot.Infrastructure.Example.DbContext;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using IMediator = Learning.AggregateRoot.Domain.CQRS.Interfaces.IMediator;
using Mediator = Learning.AggregateRoot.Infrastructure.CQRS.Mediator;

namespace Learning.AggregateRoot.Application
{
    public class Startup
    {
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
                .AddScoped<IUnitOfWork, GenericUnitOfWork>()
                .AddScoped(typeof(ISession<>), typeof(Session<>))
                .AddScoped(typeof(ISession<,>), typeof(Session<,>))
                .AddScoped(typeof(IRepository<>), typeof(GenericRepository<>))
                // Register authentification context.
                .AddSingleton<IHttpContextAccessor, HttpContextAccessor>()
                .AddScoped<IRequestContext, RequestContext>()
                .AddScoped<IAuthentificationContext, AuthentificationContext>()
                // Audit
                .AddScoped<IDatabaseChangesAuditService, GenericsDatabaseChangesAuditService>()
                .AddScoped<IAuditSerializer, AuditSerializer>()
                // Register Db context.
                .AddDbContextPool<AuditDbContext>(options => options.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Audit;Trusted_Connection=True;MultipleActiveResultSets=true"))
                .AddDbContextPool<YourDbContext>(options => options.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=AggregateRoot;Trusted_Connection=True;MultipleActiveResultSets=true"))
                // example
                .AddScoped<IAuthentificationContextUserProvider, FakeAuthentificationContextUserProvider>()
                .AddScoped<IItemReader, ItemReader>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.ServiceProvider.GetRequiredService<YourDbContext>().Database.Migrate();
                serviceScope.ServiceProvider.GetRequiredService<AuditDbContext>().Database.Migrate();
            }

            app.UseMvc();
        }
    }
}
