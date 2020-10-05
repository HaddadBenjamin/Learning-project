using System;

namespace Learning.AggregateRoot
{
    // Doit être setté par un middleware.
    public interface IAuthentificationContext
    {
        public IUser User { get; set; }
        public IUser ImpersonifiedUser { get; set; }
        public Guid CorrelationId { get; set; }
    }
}