using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.AggregateRoot.Infrastructure.Migrations
{
    public partial class removeAudit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuditCommands");

            migrationBuilder.DropTable(
                name: "AuditEvents");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AuditCommands",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AggregateRootName = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Command = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CommandName = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CorrelationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ImpersonatedUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditCommands", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuditEvents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CorrelationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Event = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    EventName = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ImpersonatedUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditEvents", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AuditCommands_AggregateRootName",
                table: "AuditCommands",
                column: "AggregateRootName");

            migrationBuilder.CreateIndex(
                name: "IX_AuditCommands_Command",
                table: "AuditCommands",
                column: "Command");

            migrationBuilder.CreateIndex(
                name: "IX_AuditCommands_CommandName",
                table: "AuditCommands",
                column: "CommandName");

            migrationBuilder.CreateIndex(
                name: "IX_AuditCommands_CorrelationId",
                table: "AuditCommands",
                column: "CorrelationId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditCommands_Date",
                table: "AuditCommands",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_AuditCommands_Id",
                table: "AuditCommands",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_AuditCommands_ImpersonatedUserId",
                table: "AuditCommands",
                column: "ImpersonatedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditCommands_UserId",
                table: "AuditCommands",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditEvents_CorrelationId",
                table: "AuditEvents",
                column: "CorrelationId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditEvents_Date",
                table: "AuditEvents",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_AuditEvents_Event",
                table: "AuditEvents",
                column: "Event");

            migrationBuilder.CreateIndex(
                name: "IX_AuditEvents_EventName",
                table: "AuditEvents",
                column: "EventName");

            migrationBuilder.CreateIndex(
                name: "IX_AuditEvents_Id",
                table: "AuditEvents",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_AuditEvents_ImpersonatedUserId",
                table: "AuditEvents",
                column: "ImpersonatedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditEvents_UserId",
                table: "AuditEvents",
                column: "UserId");
        }
    }
}
