namespace Learning.AggregateRoot.Domain.Interfaces.CQRS
{
    public interface ITrack<TAggregate>
        where TAggregate : AggregateRoot
    {
        void Track(TAggregate aggregate);
        void UnTrack(TAggregate aggregate);
    }
}