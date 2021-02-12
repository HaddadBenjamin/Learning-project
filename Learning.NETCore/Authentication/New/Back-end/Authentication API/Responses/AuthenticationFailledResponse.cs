using System.Collections.Generic;

namespace Authentication.Controllers
{
    public class AuthenticationFailledResponse
    {
        public IEnumerable<string> Errors { get; set; }
    }
}