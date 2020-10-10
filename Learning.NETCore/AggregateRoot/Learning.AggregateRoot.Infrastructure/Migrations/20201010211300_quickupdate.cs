using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.AggregateRoot.Infrastructure.Migrations
{
    public partial class quickupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Items_IsActive",
                table: "Items",
                column: "IsActive");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Items_IsActive",
                table: "Items");
        }
    }
}
