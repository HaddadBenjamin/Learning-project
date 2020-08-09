using System.Collections;

namespace Learning.RealTimeApplication.API
{
    public class ConnectionIdResolver
    {
        // Dans un scénario de production, ces informations devraient-être stockées dans une base de données.
        private Hashtable _usernameToConnectionId = new Hashtable();

        public string Resolve(string username) =>
            _usernameToConnectionId.ContainsKey(username) ? (string) _usernameToConnectionId[username] : null;

        public void UpdateConnectionIdMapping(string username, string connectionId) =>
            _usernameToConnectionId.Add(username, connectionId);
    }
}