using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.AggregateRoot.Infrastructure.Migrations.YourDb
{
    public partial class AggregateRootDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Version = table.Column<int>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<Guid>(nullable: false),
                    CreatedOnBehalfOf = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    LastUpdatedBy = table.Column<Guid>(nullable: false),
                    LastUpdatedOnBehalfOf = table.Column<Guid>(nullable: false),
                    LastUpdatedAt = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ItemLocation",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ItemId = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemLocation", x => new { x.ItemId, x.Id });
                    table.ForeignKey(
                        name: "FK_ItemLocation_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemLocation_Id",
                table: "ItemLocation",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ItemLocation_ItemId",
                table: "ItemLocation",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemLocation_Id_ItemId",
                table: "ItemLocation",
                columns: new[] { "Id", "ItemId" });

            migrationBuilder.CreateIndex(
                name: "IX_Items_Id",
                table: "Items",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Items_IsActive",
                table: "Items",
                column: "IsActive");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemLocation");

            migrationBuilder.DropTable(
                name: "Items");
        }
    }
}
