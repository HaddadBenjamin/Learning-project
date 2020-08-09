using System.Collections;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Learning.RealTimeApplication.API
{
    public class ChatHub : Hub
    {
        // Dans un scénario de production, ces informations devraient-être stockées dans une base de données.
        private Hashtable _usernameToConnectionId = new Hashtable();

        private void UpdateConnectionIdToUsername(string username) =>
            _usernameToConnectionId.Add(username, Context.ConnectionId);

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

        public async Task SendMessageToAllUsers(string username, string message)
        {
            UpdateConnectionIdToUsername(username);

            await Clients.All.SendAsync("SendMessageToAllUsers", username, message);
        }

        public async Task SendRoomMessage(string username, string groupName, string message)
        {
            UpdateConnectionIdToUsername(username);
            
            await Clients.Group(groupName).SendAsync("SendRoomMessage", username, groupName, message);
        }

        public async Task SendPrivateMessage(string fromUsername, string toUsername, string message)
        {
            UpdateConnectionIdToUsername(fromUsername);

            if (_usernameToConnectionId.ContainsKey(toUsername))
            {
                var toConnectionId = (string)_usernameToConnectionId[toUsername];

                await Clients.Client(toConnectionId).SendAsync("SendPrivateMessage", fromUsername, $"'{fromUsername}' sent you a private message '{message}'");
            }
        }
    }
}