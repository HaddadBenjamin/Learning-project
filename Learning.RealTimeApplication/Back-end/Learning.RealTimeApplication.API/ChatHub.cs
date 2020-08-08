using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Learning.RealTimeApplication.API
{
    public class ChatHub : Hub
    {
        public async Task Broadcast(string username, string message) =>
            await Clients.All.SendAsync("Broadcast", username, message);

        public async Task AddUserInGroup(string username, string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("UserEnteredInGroup", username);
        }

        public async Task RemoveUserFromGroup(string username, string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("UserLeaveGroup", username);
        }

        public async Task SendMessageToGroup(string username, string groupName, string message) =>
            await Clients.Group(groupName).SendAsync("SendMessageToGroup", username, message);
    }
}