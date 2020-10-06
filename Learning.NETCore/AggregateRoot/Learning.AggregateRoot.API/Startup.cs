using Learning.AggregateRoot.Domain.Interfaces;
using Learning.AggregateRoot.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using IMediator = Learning.AggregateRoot.Domain.Interfaces.IMediator;
using Mediator = Learning.AggregateRoot.Infrastructure.Mediator;

namespace Learning.AggregateRoot.API
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddMediatR(typeof(Mediator));
            services.AddSingleton<IMediator, Mediator>();
            services.AddScoped(typeof(ISession<,>), typeof(Session<,>));
            services.AddScoped(typeof(IRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IAuthentificationContext, AuthentificationContext>();
            services.AddSingleton<IRequestContext, RequestContext>();
            services.AddScoped<IAuthentificationContextUser, FakeAuthentificationContextUser>();
            services.AddSingleton<IAuthentificationContextUserProvider, FakeAuthentificationContextUserProvider>();
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
