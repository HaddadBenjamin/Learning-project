using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.AggregateRoot.Infrastructure.Migrations.AuditDb
{
    public partial class AuditAggregateRootChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AuditAggregateRootChanges",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    TableName = table.Column<string>(nullable: true),
                    AggregateRootId = table.Column<Guid>(nullable: false),
                    Action = table.Column<string>(nullable: true),
                    Delta = table.Column<string>(nullable: true),
                    CorrelationId = table.Column<Guid>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    ImpersonatedUserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditAggregateRootChanges", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AuditAggregateRootChanges_Action",
                table: "AuditAggregateRootChanges",
                column: "Action");

            migrationBuilder.CreateIndex(
                name: "IX_AuditAggregateRootChanges_AggregateRootId",
                table: "AuditAggregateRootChanges",
                column: "AggregateRootId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditAggregateRootChanges_CorrelationId",
                table: "AuditAggregateRootChanges",
                column: "CorrelationId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditAggregateRootChanges_Date",
                table: "AuditAggregateRootChanges",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_AuditAggregateRootChanges_Delta",
                table: "AuditAggregateRootChanges",
                column: "Delta");

            migrationBuilder.CreateIndex(
                name: "IX_AuditAggregateRootChanges_Id",
                table: "AuditAggregateRootChanges",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_AuditAggregateRootChanges_ImpersonatedUserId",
                table: "AuditAggregateRootChanges",
                column: "ImpersonatedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditAggregateRootChanges_TableName",
                table: "AuditAggregateRootChanges",
                column: "TableName");

            migrationBuilder.CreateIndex(
                name: "IX_AuditAggregateRootChanges_UserId",
                table: "AuditAggregateRootChanges",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuditAggregateRootChanges");
        }
    }
}
