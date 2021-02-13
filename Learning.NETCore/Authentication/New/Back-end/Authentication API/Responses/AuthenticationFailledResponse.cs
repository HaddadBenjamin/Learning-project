using System.Collections.Generic;

namespace Authentication.Responses
{
    public class AuthenticationFailledResponse
    {
        public IEnumerable<string> Errors { get; set; }
    }
}