using System.Linq;
using System.Reflection;

namespace Learning.AggregateRoot.Domain.Audit.Attributes
{
    public static class AuditAttributeExtensions
    {
        public static bool ShouldAudit(this MemberInfo memberInfo) => !(memberInfo is null || memberInfo.GetCustomAttributes<ShallNotAuditAttribute>(true).Any());
    }
}