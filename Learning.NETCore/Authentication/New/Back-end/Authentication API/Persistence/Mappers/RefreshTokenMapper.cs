using Authentication.Persistence.Entities;
using Microsoft.EntityFrameworkCore;

namespace Authentication.Persistence.Mappers
{
    public static class RefreshTokenMapper
    {
        public static void Map(ModelBuilder modelBuilder)
        {
            var entity = modelBuilder.Entity<RefreshToken>();

            entity.HasKey(_ => _.RefreshTokenValue);
            entity.HasIndex(_ => _.RefreshTokenValue);
            entity
                .HasOne(po => po.User)
                .WithMany(a => a.RefreshTokens)
                .HasForeignKey(po => po.UserId);
        }
    }
}
