using Learning.AggregateRoot.API.Middlewares;
using Learning.AggregateRoot.Domain.Example.Aggregate;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;
using Learning.AggregateRoot.Domain.Interfaces.CQRS;
using Learning.AggregateRoot.Infrastructure;
using Learning.AggregateRoot.Infrastructure.Example;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using IMediator = Learning.AggregateRoot.Domain.Interfaces.CQRS.IMediator;
using Mediator = Learning.AggregateRoot.Infrastructure.Mediator;

namespace Learning.AggregateRoot.API
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services
                .AddMediatR(typeof(Mediator))
                .AddSingleton<IMediator, Mediator>()
                .AddSingleton<IRequestContext, RequestContext>()
                .AddSingleton<IAuthentificationContextUserProvider, FakeAuthentificationContextUserProvider>()
                .AddScoped(typeof(ISession<>), typeof(Session<>))
                .AddScoped(typeof(ISession<Item>), typeof(Session<Item>))
                .AddScoped(typeof(ISession<,>), typeof(Session<,>))
                .AddScoped(typeof(IRepository<>), typeof(GenericRepository<>))
                .AddScoped<IAuthentificationContext, AuthentificationContext>()
                .AddScoped<IAuthentificationContextUser, FakeAuthentificationContextUser>()
                .AddDbContext<YourDbContext>(opt => opt.UseInMemoryDatabase("TestDb"));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseMiddleware<RequestContextMiddleware>();

            app.UseRouting();
            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}
