namespace Learning.AggregateRoot.Domain.Audit.Configuration
{
    public class AuditConfiguration
    {
        public bool AuditCommand { get; set; }
        public bool AuditQuery { get; set; }
        public bool AuditEvent { get; set; }
        public bool AuditDatabaseChange { get; set; }
    }
}
