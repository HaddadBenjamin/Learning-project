using System;
using Microsoft.EntityFrameworkCore;

namespace Post.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions) : base(dbContextOptions) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var post = modelBuilder.Entity<Post>();

            post.HasKey(_ => _.Id);
            post.HasIndex(_ => _.Id);
            post.Property(po => po.UserId).IsRequired();
        }
    }

    public class Post
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public string UserId { get; set; }
    }
}