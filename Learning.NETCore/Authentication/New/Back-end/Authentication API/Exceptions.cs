using System;
using System.Collections.Generic;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Diagnostics;

namespace Authentication.Exceptions
{
    public class ExceptionHandlerFilter : ExceptionFilterAttribute
    {
        private static readonly Dictionary<Type, HttpStatusCode> ExceptionTypeToHttpStatus = new Dictionary<Type, HttpStatusCode>
        {
            { typeof(NotFoundException), HttpStatusCode.NotFound },
            { typeof(ForbiddenException), HttpStatusCode.Forbidden },
            { typeof(BadRequestException), HttpStatusCode.BadRequest },
        };

        public override void OnException(ExceptionContext exceptionContext)
        {
            var exception = exceptionContext.Exception.Demystify();
            var responseHttpStatus = ExceptionTypeToHttpStatus.GetValueOrDefault(exception.GetType(), HttpStatusCode.InternalServerError);

            exceptionContext.Result = new JsonResult(exception.ToString()) { StatusCode = (int)responseHttpStatus };
        }
    }

    public class BadRequestException : Exception
    {
        public BadRequestException(string message) : base(message) { }
    }

    public class ForbiddenException : Exception
    {
        public ForbiddenException() : base($"You're not authorized to access to this resource") { }
    }

    public class NotFoundException : Exception
    {
        public NotFoundException(string resource, Guid id) : this(resource, id.ToString()) { }
        public NotFoundException(string resource, string id) : base($"{resource} with id {id} not found") { }
    }
}
