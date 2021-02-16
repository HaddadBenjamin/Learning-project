using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Authentication.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {   
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions) : base(dbContextOptions) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var refreshToken = modelBuilder.Entity<RefreshToken>();

            refreshToken.HasKey(_ => _.RefreshTokenValue);
            refreshToken.HasIndex(_ => _.RefreshTokenValue);
            refreshToken
                .HasOne(po => po.User)
                .WithMany(a => a.RefreshTokens)
                .HasForeignKey(po => po.UserId);

            modelBuilder.Entity<ApplicationUser>().ToTable("Users");
            modelBuilder.Entity<IdentityRole>().ToTable("Roles");
            modelBuilder.Entity<IdentityUserToken<string>>().ToTable("UserTokens");
            modelBuilder.Entity<IdentityUserRole<string>>().ToTable("UserRoles");
            modelBuilder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims");
            modelBuilder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims");
            modelBuilder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins");
        }
    }

    public class ApplicationUser : IdentityUser
    {
        public virtual ICollection<RefreshToken> RefreshTokens { get; set; }
    }

    public class RefreshToken
    {
        public string RefreshTokenValue { get; set; }
        public string JwtId { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public bool Used { get; set; }
        /// <summary>
        /// A refresh token must be invalidated when the user password has been changed or on a 'identity/revoke' call.
        /// </summary>
        public bool Invalidated { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}