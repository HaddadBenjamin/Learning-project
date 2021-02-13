using System;

namespace Authentication.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string resource, Guid id) : this(resource, id.ToString()) { }
        public NotFoundException(string resource, string id) : base($"{resource} with id {id} not found") { }
    }
}