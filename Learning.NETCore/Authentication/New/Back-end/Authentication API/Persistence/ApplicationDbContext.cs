using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Authentication.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {   
        public DbSet<Post> Posts { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions) : base(dbContextOptions) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var entity = modelBuilder.Entity<Post>();

            entity.HasKey(_ => _.Id);
            entity.HasIndex(_ => _.Id);
            entity
                .HasOne(po => po.User)
                .WithMany(a => a.Posts)
                .HasForeignKey(po => po.UserId);
        }
    }
}
