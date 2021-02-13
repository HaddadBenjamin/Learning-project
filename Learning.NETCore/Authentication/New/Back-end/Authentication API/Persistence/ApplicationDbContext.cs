using Authentication.Persistence.Entities;
using Authentication.Persistence.Mappers;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Authentication.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {   
        public DbSet<Post> Posts { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions) : base(dbContextOptions) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            PostMapper.Map(modelBuilder);
            RefreshTokenMapper.Map(modelBuilder);
        }
    }
}