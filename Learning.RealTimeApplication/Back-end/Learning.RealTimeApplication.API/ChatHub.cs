using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Learning.RealTimeApplication.API
{
    public class ChatHub : Hub
    {
        private readonly ConnectionIdResolver _connectionIdResolver;

        public ChatHub(ConnectionIdResolver connectionIdResolver) => _connectionIdResolver = connectionIdResolver;

        public async Task UserJoinRoom(string username, string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("UserJoinRoom", username, groupName);

            await SendRoomMessage(username, groupName, $"'{username}' joined '{groupName}' room");
        }

        public async Task UserLeaveRoom(string username, string groupName)
        {
            await SendRoomMessage(username, groupName, $"'{username}' leaved '{groupName}' room");

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("UserLeaveRoom", username);
        }

        public async Task SendMessageToAllUsers(string username, string message)
        {
            _connectionIdResolver.UpdateConnectionIdMapping(username, Context.ConnectionId);

            await Clients.All.SendAsync("SendMessageToAllUsers", username, message);
        }

        public async Task SendRoomMessage(string username, string groupName, string message)
        {
            _connectionIdResolver.UpdateConnectionIdMapping(username, Context.ConnectionId);
            
            await Clients.Group(groupName).SendAsync("SendRoomMessage", username, groupName, message);
        }

        public async Task SendPrivateMessage(string fromUsername, string toUsername, string message)
        {
            _connectionIdResolver.UpdateConnectionIdMapping(fromUsername, Context.ConnectionId);

            var toConnectionId = _connectionIdResolver.Resolve(toUsername);

            await Clients.Client(toConnectionId).SendAsync("SendPrivateMessage", fromUsername, $"'{fromUsername}' sent you a private message '{message}'");
        }

        public async Task StreamVideoToAllClients(IAsyncEnumerable<string> stream)
        {
            await foreach (var item in stream)
                await Clients.All.SendAsync("StreamVideoToAllClients", item);
        }

        // Clients.Caller : l'appelant.
        // Clients.Others : autre personne que l'appellant.
        // Clients.User(userId) : targetter un client grâce à son user id.
    }
}