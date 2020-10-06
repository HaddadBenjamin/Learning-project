using System.Linq;
using Microsoft.AspNetCore.Http;

namespace Learning.AggregateRoot.API.Extensions
{
    public static class HttpRequestExtension
    {
        public static string GetHeaderOrDefault(this HttpRequest request, string key, string defaultValue = default) =>
            request.Headers.FirstOrDefault(x => x.Key == key).Value.FirstOrDefault() ?? defaultValue;
    }
}