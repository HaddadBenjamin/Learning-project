using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
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

            var post = modelBuilder.Entity<Post>();

            post.HasKey(_ => _.Id);
            post.HasIndex(_ => _.Id);
            post
                .HasOne(po => po.User)
                .WithMany(a => a.Posts)
                .HasForeignKey(po => po.UserId);

            var refreshToken = modelBuilder.Entity<RefreshToken>();

            refreshToken.HasKey(_ => _.RefreshTokenValue);
            refreshToken.HasIndex(_ => _.RefreshTokenValue);
            refreshToken
                .HasOne(po => po.User)
                .WithMany(a => a.RefreshTokens)
                .HasForeignKey(po => po.UserId);
        }
    }

    public class ApplicationUser : IdentityUser
    {
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<RefreshToken> RefreshTokens { get; set; }
    }

    public class Post
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
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