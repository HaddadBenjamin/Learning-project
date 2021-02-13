using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Authentication
{
    public class ApplicationDbContext : IdentityDbContext
    {
        private readonly WriteModelConfiguration _writeModelConfiguration;

        public ApplicationDbContext(WriteModelConfiguration writeModelConfiguration) => _writeModelConfiguration = writeModelConfiguration;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlServer(_writeModelConfiguration.ConnectionString);
    }
}
