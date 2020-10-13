using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.CQRS.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Learning.AggregateRoot.Application.Filters
{
    public class ExceptionHandlerFilter : ExceptionFilterAttribute
    {
        private static readonly Dictionary<Type, HttpStatusCode> ExceptionTypeToHttpStatus = new Dictionary<Type, HttpStatusCode>
        {
            { typeof(AggregateNotFoundException), HttpStatusCode.NotFound }
        };

        public override async Task OnExceptionAsync(ExceptionContext exceptionContext)
        {
            var exception = exceptionContext.Exception;
            var responseHttpStatus = ExceptionTypeToHttpStatus.GetValueOrDefault(exception.GetType(), HttpStatusCode.InternalServerError);

            exceptionContext.Result = new JsonResult(exception) { StatusCode = (int)responseHttpStatus };

            await Task.CompletedTask;
        }
    }
}
