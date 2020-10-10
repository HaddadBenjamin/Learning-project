using System.Threading.Tasks;

namespace Learning.AggregateRoot.Domain.Interfaces.Audit
{
    public interface IDatabaseChangesAuditer
    {
        Task Audit();
    }
}