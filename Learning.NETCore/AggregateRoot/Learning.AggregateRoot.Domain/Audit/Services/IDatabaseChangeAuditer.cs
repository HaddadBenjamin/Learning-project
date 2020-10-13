using System.Threading.Tasks;

namespace Learning.AggregateRoot.Domain.Audit.Services
{
    public interface IDatabaseChangesAuditService
    {
        Task Audit();
    }
}