using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Learning.RealTimeApplication.API
{
    public class ChatHub : Hub
    {
        public async Task Broadcast(string username, string message) =>
            await Clients.All.SendAsync("Broadcast", username, message);
    }
}