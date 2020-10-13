using System;

namespace Learning.AggregateRoot.Domain.Audit.Attributes
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Class)]
    public class ShallNotAuditAttribute : Attribute { }
}