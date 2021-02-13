using Authentication.Persistence.Entities;
using Microsoft.EntityFrameworkCore;

namespace Authentication.Persistence.Mappers
{
    public static class PostMapper
    {
        public static void Map(ModelBuilder modelBuilder)
        {
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
