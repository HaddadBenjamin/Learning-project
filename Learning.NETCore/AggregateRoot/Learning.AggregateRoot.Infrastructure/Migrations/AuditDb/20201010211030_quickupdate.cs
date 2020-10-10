using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.AggregateRoot.Infrastructure.Migrations.AuditDb
{
    public partial class quickupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AuditAggregateRootChanges",
                table: "AuditAggregateRootChanges");

            migrationBuilder.RenameTable(
                name: "AuditAggregateRootChanges",
                newName: "AuditDatabaseChanges");

            migrationBuilder.RenameIndex(
                name: "IX_AuditAggregateRootChanges_UserId",
                table: "AuditDatabaseChanges",
                newName: "IX_AuditDatabaseChanges_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_AuditAggregateRootChanges_TableName",
                table: "AuditDatabaseChanges",
                newName: "IX_AuditDatabaseChanges_TableName");

            migrationBuilder.RenameIndex(
                name: "IX_AuditAggregateRootChanges_ImpersonatedUserId",
                table: "AuditDatabaseChanges",
                newName: "IX_AuditDatabaseChanges_ImpersonatedUserId");

            migrationBuilder.RenameIndex(
                name: "IX_AuditAggregateRootChanges_Id",
                table: "AuditDatabaseChanges",
                newName: "IX_AuditDatabaseChanges_Id");

            migrationBuilder.RenameIndex(
                name: "IX_AuditAggregateRootChanges_EntityId",
                table: "AuditDatabaseChanges",
                newName: "IX_AuditDatabaseChanges_EntityId");

            migrationBuilder.RenameIndex(
                name: "IX_AuditAggregateRootChanges_Delta",
                table: "AuditDatabaseChanges",
                newName: "IX_AuditDatabaseChanges_Delta");

            migrationBuilder.RenameIndex(
                name: "IX_AuditAggregateRootChanges_Date",
                table: "AuditDatabaseChanges",
                newName: "IX_AuditDatabaseChanges_Date");

            migrationBuilder.RenameIndex(
                name: "IX_AuditAggregateRootChanges_CorrelationId",
                table: "AuditDatabaseChanges",
                newName: "IX_AuditDatabaseChanges_CorrelationId");

            migrationBuilder.RenameIndex(
                name: "IX_AuditAggregateRootChanges_Action",
                table: "AuditDatabaseChanges",
                newName: "IX_AuditDatabaseChanges_Action");

            migrationBuilder.AlterColumn<string>(
                name: "Action",
                table: "AuditDatabaseChanges",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_AuditDatabaseChanges",
                table: "AuditDatabaseChanges",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AuditDatabaseChanges",
                table: "AuditDatabaseChanges");

            migrationBuilder.RenameTable(
                name: "AuditDatabaseChanges",
                newName: "AuditAggregateRootChanges");

            migrationBuilder.RenameIndex(
                name: "IX_AuditDatabaseChanges_UserId",
                table: "AuditAggregateRootChanges",
                newName: "IX_AuditAggregateRootChanges_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_AuditDatabaseChanges_TableName",
                table: "AuditAggregateRootChanges",
                newName: "IX_AuditAggregateRootChanges_TableName");

            migrationBuilder.RenameIndex(
                name: "IX_AuditDatabaseChanges_ImpersonatedUserId",
                table: "AuditAggregateRootChanges",
                newName: "IX_AuditAggregateRootChanges_ImpersonatedUserId");

            migrationBuilder.RenameIndex(
                name: "IX_AuditDatabaseChanges_Id",
                table: "AuditAggregateRootChanges",
                newName: "IX_AuditAggregateRootChanges_Id");

            migrationBuilder.RenameIndex(
                name: "IX_AuditDatabaseChanges_EntityId",
                table: "AuditAggregateRootChanges",
                newName: "IX_AuditAggregateRootChanges_EntityId");

            migrationBuilder.RenameIndex(
                name: "IX_AuditDatabaseChanges_Delta",
                table: "AuditAggregateRootChanges",
                newName: "IX_AuditAggregateRootChanges_Delta");

            migrationBuilder.RenameIndex(
                name: "IX_AuditDatabaseChanges_Date",
                table: "AuditAggregateRootChanges",
                newName: "IX_AuditAggregateRootChanges_Date");

            migrationBuilder.RenameIndex(
                name: "IX_AuditDatabaseChanges_CorrelationId",
                table: "AuditAggregateRootChanges",
                newName: "IX_AuditAggregateRootChanges_CorrelationId");

            migrationBuilder.RenameIndex(
                name: "IX_AuditDatabaseChanges_Action",
                table: "AuditAggregateRootChanges",
                newName: "IX_AuditAggregateRootChanges_Action");

            migrationBuilder.AlterColumn<string>(
                name: "Action",
                table: "AuditAggregateRootChanges",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddPrimaryKey(
                name: "PK_AuditAggregateRootChanges",
                table: "AuditAggregateRootChanges",
                column: "Id");
        }
    }
}
