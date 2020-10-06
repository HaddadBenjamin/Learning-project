using System;
using System.Threading.Tasks;
using Learning.AggregateRoot.API.Extensions;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;
using Microsoft.AspNetCore.Http;

namespace Learning.AggregateRoot.API.Middlewares
{
    public class RequestContextMiddleware
    {
        private readonly RequestDelegate _nextMiddleware;
        private readonly IRequestContext _requestContext;

        public RequestContextMiddleware(RequestDelegate nextMiddleware, IRequestContext requestContext)
        {
            _nextMiddleware = nextMiddleware;
            _requestContext = requestContext;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            var request = httpContext.Request;

            _requestContext.ClientApplication = request.GetHeaderOrDefault("clientApplication");
            _requestContext.CorrelationId = Guid.Parse(request.GetHeaderOrDefault("correlationId", Guid.NewGuid().ToString()));
            _requestContext.UserEmail = request.GetHeaderOrDefault("userEmail");
            _requestContext.ImpersonatedUserEmail = request.GetHeaderOrDefault("impersonatedUserEmail");
            _requestContext.ReadVersion = request.GetHeaderOrDefault("readVersion", "v1");
            _requestContext.WriteVersion = request.GetHeaderOrDefault("writeVersion", "v1");
           
            await _nextMiddleware.Invoke(httpContext);
        }
    }
}