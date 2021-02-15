using System.Linq;
using Microsoft.AspNetCore.Http;

namespace Authentication.Extensions
{
    public static class Extensions
    {
        public static string GetUserId(this HttpContext httpContext) => httpContext.User == null ?
            string.Empty :
            httpContext.User.Claims.Single(c => c.Type == "id").Value;
    }
}