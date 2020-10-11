using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.AggregateRoot.Infrastructure.Migrations.AuditDb
{
    public partial class DeltaUpdate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AuditDatabaseChanges_Delta",
                table: "AuditDatabaseChanges");

            migrationBuilder.AlterColumn<string>(
                name: "Delta",
                table: "AuditDatabaseChanges",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(4000)",
                oldMaxLength: 4000,
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Delta",
                table: "AuditDatabaseChanges",
                type: "nvarchar(4000)",
                maxLength: 4000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AuditDatabaseChanges_Delta",
                table: "AuditDatabaseChanges",
                column: "Delta");
        }
    }
}
