using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Learning.RealTimeApplication.API
{
    public class ChatHub : Hub
    {
        public async Task Broadcast(string username, string message) =>
            await Clients.All.SendAsync("Broadcast", username, message);

        public async Task UserJoinRoom(string username, string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("UserJoinRoom", username, groupName);
            await SendRoomMessage(username, groupName, $"'{username}' joined '{groupName}' room");
        }

        public async Task UseLeaveRoom(string username, string groupName)
        {
            await SendRoomMessage(username, groupName, $"'{username}' leaved '{groupName}' room");
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("UseLeaveRoom", username);
        }

        public async Task SendRoomMessage(string username, string groupName, string message) =>
            await Clients.Group(groupName).SendAsync("SendRoomMessage", username, groupName, message);
    }
}