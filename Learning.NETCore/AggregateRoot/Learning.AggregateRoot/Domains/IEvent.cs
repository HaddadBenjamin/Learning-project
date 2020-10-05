using System;

namespace Learning.AggregateRoot
{
    // Cette classe devrait hériter de l'event du médiateur de j.boggard.
    public interface IEvent
    {
        public Guid Id { get; set; }
        public Guid CorrelationId { get; set; }
        public int Version { get; set; }
        public DateTime Date { get; set; }
    }
}