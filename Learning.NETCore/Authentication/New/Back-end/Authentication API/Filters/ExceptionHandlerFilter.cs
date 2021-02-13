using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using Authentication.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Authentication.Filters
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
}