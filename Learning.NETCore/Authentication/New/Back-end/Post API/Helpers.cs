using System.Linq;
using Microsoft.AspNetCore.Http;

namespace Post.Helpers
{
    public static class Helpers
    {
        public static string GetAccessToken(HttpContext httpContext) =>
            GetHeaderOrDefault(httpContext, "Authorization")?.Trim().Substring(7);
        
        public static string GetHeaderOrDefault(HttpContext httpContext, string key, string defaultValue = default) =>
            httpContext.Request.Headers.FirstOrDefault(x => x.Key == key).Value.FirstOrDefault() ?? defaultValue;
    }
}