namespace Learning.AggregateRoot.Domain.Audit.Services
{
    public interface IAuditSerializer
    {
        string Serialize(object @object);
    }
}