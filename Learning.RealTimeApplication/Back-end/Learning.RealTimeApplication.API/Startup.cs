using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Learning.RealTimeApplication.API
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services) => services.AddSignalR();

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseRouting();

            app.UseSignalR(routes => routes.MapHub<ChatHub>("/"));
        }
    }

    public class ChatHub : Hub
    {
        public async Task Broadcast(string username, string message) =>
            await Clients.All.SendAsync("Broadcast", username, message);
    }
}
