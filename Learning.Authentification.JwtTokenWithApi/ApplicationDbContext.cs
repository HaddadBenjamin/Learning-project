using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.DependencyInjection;

namespace Learning.Authentification.JwtTokenWithApi
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder) => base.OnModelCreating(modelBuilder);
    }

    public class ApplicationUser : IdentityUser { }
    public class ApplicationRole : IdentityRole { }

    public static class DatabaseSeeder
    {
        public static void Seed(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();
                var userManager = serviceScope.ServiceProvider.GetService<UserManager<ApplicationUser>>();

                dbContext.Database.EnsureCreated();

                if (!dbContext.Users.Any())
                {
                    var user = new ApplicationUser
                    {
                        Email = "toto@gmail.com",
                        SecurityStamp = Guid.NewGuid().ToString(),
                        UserName = "toto",
                    };

                    dbContext.Users.Add(user);

                    userManager.CreateAsync(user, "PasswordFaked");
                }
            }
        }
    }
}
