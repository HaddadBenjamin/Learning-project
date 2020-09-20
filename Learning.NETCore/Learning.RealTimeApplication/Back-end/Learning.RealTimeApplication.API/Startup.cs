using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Learning.RealTimeApplication.API
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("CorsPolicy", builder => builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .WithOrigins("http://localhost:3000")
                .AllowCredentials()));

            services.AddSignalR();

            services.AddSingleton(new ConnectionIdResolver());
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseRouting();

            app.UseCors("CorsPolicy");
            app.UseEndpoints(routes => routes.MapHub<ChatHub>("/chat"));
        }
    }
}
