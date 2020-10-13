namespace Learning.AggregateRoot.Domain.CQRS.Interfaces
{
    public interface ITrack<TAggregate> where TAggregate : AggregateRoot
    {
        void Track(TAggregate aggregate);
        void UnTrack(TAggregate aggregate);
    }
}