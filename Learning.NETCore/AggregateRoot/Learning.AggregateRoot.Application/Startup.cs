using Learning.AggregateRoot.Application.Example;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;
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
            services.AddMvc(options => options.EnableEndpointRouting = false);
            services.AddRouting(options => options.LowercaseUrls = true);

            services
                // Register CQRS : mediator / session / repository.
                .AddMediatR(typeof(ItemHandler))
                .AddSingleton<IMediator, Mediator>()
                .AddScoped(typeof(ISession<>), typeof(Session<>))
                .AddScoped(typeof(ISession<,>), typeof(Session<,>))
                .AddScoped(typeof(IRepository<>), typeof(GenericRepository<>))
                // Register authentification context.
                .AddSingleton<IRequestContext, RequestContext>()
                .AddSingleton<IAuthentificationContextUserProvider, FakeAuthentificationContextUserProvider>()
                .AddScoped<IAuthentificationContext, AuthentificationContext>()
                .AddScoped<IAuthentificationContextUser, FakeAuthentificationContextUser>()
                // Register Db context.
                .AddDbContextPool<YourDbContext>(options => options.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=AggregateRoot;Trusted_Connection=True;MultipleActiveResultSets=true"));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app
                .UseMiddleware<FakeRequestContextMiddleware>() // � remplacer par app.UseMiddleware<RequestContextMiddleware>();
                .UseMvc();
        }
    }
}
