using Microsoft.AspNetCore.Http;

namespace Authentication.Utilities
{
    public static class Helpers
    {
        public static string GetAccessToken(HttpContext httpContext)
        {
            httpContext.Request.Headers.TryGetValue("Authorization", out var authorizationHeaderValues);

            return authorizationHeaderValues.ToString()?.Trim().Substring(7);
        }
    }
}