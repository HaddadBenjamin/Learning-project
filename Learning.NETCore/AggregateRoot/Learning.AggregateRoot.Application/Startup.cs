using Learning.AggregateRoot.Application.Example;
using Learning.AggregateRoot.Application.Filters;
using Learning.AggregateRoot.Application.Middlewares;
using Learning.AggregateRoot.Domain.Example.Readers;
using Learning.AggregateRoot.Domain.Interfaces.Audit;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;
using Learning.AggregateRoot.Infrastructure.Audit;
using Learning.AggregateRoot.Infrastructure.AuthentificationContext;
using Learning.AggregateRoot.Infrastructure.CQRS;
using Learning.AggregateRoot.Infrastructure.Example.AuthentificationContext;
using Learning.AggregateRoot.Infrastructure.Example.CommandHandlers;
using Learning.AggregateRoot.Infrastructure.Example.DbContext;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using IMediator = Learning.AggregateRoot.Domain.Interfaces.CQRS.IMediator;
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
            //services.AddRouting(options => options.LowercaseUrls = true);

            services
                // Register CQRS : mediator / session / repository.
                .AddMediatR(typeof(Mediator))
                .AddScoped<IMediator, Mediator>()
                .AddScoped(typeof(ISession<>), typeof(Session<>))
                .AddScoped(typeof(ISession<,>), typeof(Session<,>))
                .AddScoped(typeof(IRepository<>), typeof(GenericRepository<>))
                // Register authentification context.
                .AddSingleton<IRequestContext, RequestContext>()
                .AddScoped<IAuthentificationContext, AuthentificationContext>()
                // Audit
                .AddScoped<ICommandAuditer, CommandAuditer>()
                .AddScoped<IEventAuditer, EventAuditer>()
                // Register Db context.
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
                var dbContext = serviceScope.ServiceProvider.GetRequiredService<YourDbContext>();
                dbContext.Database.Migrate();
            }

            app
                .UseMiddleware<RequestContextMiddleware>()
                .UseMvc();
        }
    }
}
