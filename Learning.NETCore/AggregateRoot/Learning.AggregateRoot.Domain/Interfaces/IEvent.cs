using System;

namespace Learning.AggregateRoot.Domain.Interfaces
{
    // Cette classe devrait hériter de l'event du médiateur de j.boggard.
    public interface IEvent
    {
        Guid Id { get; set; }
        Guid CorrelationId { get; set; }
        int Version { get; set; }
        DateTime Date { get; set; }
    }
}