using System;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Interfaces.AuthentificationContext;
using Microsoft.AspNetCore.Http;

namespace Learning.AggregateRoot.Application.Example
{
    public class FakeRequestContextMiddleware
    {
        private readonly RequestDelegate _nextMiddleware;
        private readonly IRequestContext _requestContext;

        public FakeRequestContextMiddleware(RequestDelegate nextMiddleware, IRequestContext requestContext)
        {
            _nextMiddleware = nextMiddleware;
            _requestContext = requestContext;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            var request = httpContext.Request;

            _requestContext.ClientApplication = "TestAggregateRoot";
            _requestContext.CorrelationId = Guid.NewGuid();
            _requestContext.UserEmail = "fake-email@gmail.com";
            _requestContext.ImpersonatedUserEmail = "fake-email@gmail.com";
            _requestContext.ReadVersion = "v1";
            _requestContext.WriteVersion = "v1";

            await _nextMiddleware.Invoke(httpContext);
        }
    }
}