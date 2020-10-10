using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.AggregateRoot.Infrastructure.Migrations.AuditDb
{
    public partial class removeAggregateRootNameInAuditCommand : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AuditCommands_AggregateRootName",
                table: "AuditCommands");

            migrationBuilder.DropColumn(
                name: "AggregateRootName",
                table: "AuditCommands");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AggregateRootName",
                table: "AuditCommands",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AuditCommands_AggregateRootName",
                table: "AuditCommands",
                column: "AggregateRootName");
        }
    }
}
