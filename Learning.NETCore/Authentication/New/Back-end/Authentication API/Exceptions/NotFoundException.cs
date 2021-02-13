using System;

namespace Authentication.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string resource, Guid id) : base($"{resource} with id {id} not found") { }
    }
}