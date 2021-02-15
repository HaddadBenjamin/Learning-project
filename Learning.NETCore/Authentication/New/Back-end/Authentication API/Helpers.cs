using Microsoft.AspNetCore.Http;

namespace Authentication.Utilities
{
    public static class Helpers
    {
        public static string GetAccessToken(HttpContext httpContext) =>
            httpContext.Request.Headers["Authorization"].ToString().Trim().Substring(7);
    }
}