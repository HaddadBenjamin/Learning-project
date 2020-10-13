using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.AggregateRoot.Infrastructure.Migrations
{
    public partial class simplify : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AuditDatabaseChanges_AggregateRootId",
                table: "AuditDatabaseChanges");

            migrationBuilder.DropColumn(
                name: "AggregateRootId",
                table: "AuditDatabaseChanges");

            migrationBuilder.DropColumn(
                name: "Delta",
                table: "AuditDatabaseChanges");

            migrationBuilder.AlterColumn<string>(
                name: "EntityId",
                table: "AuditDatabaseChanges",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<string>(
                name: "Changes",
                table: "AuditDatabaseChanges",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AuditDatabaseChanges_Changes",
                table: "AuditDatabaseChanges",
                column: "Changes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AuditDatabaseChanges_Changes",
                table: "AuditDatabaseChanges");

            migrationBuilder.DropColumn(
                name: "Changes",
                table: "AuditDatabaseChanges");

            migrationBuilder.AlterColumn<Guid>(
                name: "EntityId",
                table: "AuditDatabaseChanges",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "AggregateRootId",
                table: "AuditDatabaseChanges",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Delta",
                table: "AuditDatabaseChanges",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AuditDatabaseChanges_AggregateRootId",
                table: "AuditDatabaseChanges",
                column: "AggregateRootId");
        }
    }
}
