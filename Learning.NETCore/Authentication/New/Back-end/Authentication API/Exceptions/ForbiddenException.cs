using System;

namespace Authentication.Exceptions
{
    public class ForbiddenException : Exception
    {
        public ForbiddenException() : base($"You're not authorized to access to this resource") { }
    }
}
