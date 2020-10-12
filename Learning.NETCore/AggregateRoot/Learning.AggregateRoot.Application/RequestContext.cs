using System;
using Learning.AggregateRoot.Application.Extensions;
using Learning.AggregateRoot.Domain.AuthentificationContext.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Learning.AggregateRoot.Application
{
    public class RequestContext : IRequestContext
    {
        public RequestContext(IHttpContextAccessor httpContextAccessor)
        {
            var request = httpContextAccessor.HttpContext.Request;

            ClientApplication = request.GetHeaderOrDefault("clientApplication", "UNKNOWN");
            CorrelationId = Guid.Parse(request.GetHeaderOrDefault("correlationId", Guid.NewGuid().ToString()));
            UserEmail = request.GetHeaderOrDefault("userEmail");
            ImpersonatedUserEmail = request.GetHeaderOrDefault("impersonatedUserEmail");
            ReadVersion = request.GetHeaderOrDefault("readVersion", "v1");
            WriteVersion = request.GetHeaderOrDefault("writeVersion", "v1");
        }

        public string ImpersonatedUserEmail { get; set; }
        public string UserEmail { get; set; }
        public Guid CorrelationId { get; set; }
        public string ClientApplication { get; set; }
        public string ReadVersion { get; set; }
        public string WriteVersion { get; set; }
    }
}