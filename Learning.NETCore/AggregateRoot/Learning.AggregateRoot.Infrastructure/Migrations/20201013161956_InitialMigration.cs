﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Learning.AggregateRoot.Infrastructure.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AuditCommands",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CommandName = table.Column<string>(maxLength: 50, nullable: true),
                    Command = table.Column<string>(type: "text", nullable: true),
                    CorrelationId = table.Column<Guid>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    ImpersonatedUserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditCommands", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuditDatabaseChanges",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    TableName = table.Column<string>(maxLength: 50, nullable: true),
                    EntityId = table.Column<string>(nullable: true),
                    WriteAction = table.Column<string>(maxLength: 20, nullable: false),
                    Changes = table.Column<string>(nullable: true),
                    CorrelationId = table.Column<Guid>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    ImpersonatedUserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditDatabaseChanges", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuditEvents",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EventName = table.Column<string>(maxLength: 50, nullable: true),
                    Event = table.Column<string>(type: "text", nullable: true),
                    CorrelationId = table.Column<Guid>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    ImpersonatedUserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditEvents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuditQueries",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    QueryName = table.Column<string>(maxLength: 50, nullable: true),
                    Query = table.Column<string>(type: "text", nullable: true),
                    QueryResultName = table.Column<string>(maxLength: 50, nullable: true),
                    QueryResult = table.Column<string>(type: "text", nullable: true),
                    CorrelationId = table.Column<Guid>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    ImpersonatedUserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditQueries", x => x.Id);
                });

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
                name: "IX_AuditDatabaseChanges_Changes",
                table: "AuditDatabaseChanges",
                column: "Changes");

            migrationBuilder.CreateIndex(
                name: "IX_AuditDatabaseChanges_CorrelationId",
                table: "AuditDatabaseChanges",
                column: "CorrelationId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditDatabaseChanges_Date",
                table: "AuditDatabaseChanges",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_AuditDatabaseChanges_EntityId",
                table: "AuditDatabaseChanges",
                column: "EntityId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditDatabaseChanges_Id",
                table: "AuditDatabaseChanges",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_AuditDatabaseChanges_ImpersonatedUserId",
                table: "AuditDatabaseChanges",
                column: "ImpersonatedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditDatabaseChanges_TableName",
                table: "AuditDatabaseChanges",
                column: "TableName");

            migrationBuilder.CreateIndex(
                name: "IX_AuditDatabaseChanges_UserId",
                table: "AuditDatabaseChanges",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditDatabaseChanges_WriteAction",
                table: "AuditDatabaseChanges",
                column: "WriteAction");

            migrationBuilder.CreateIndex(
                name: "IX_AuditEvents_CorrelationId",
                table: "AuditEvents",
                column: "CorrelationId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditEvents_Date",
                table: "AuditEvents",
                column: "Date");

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

            migrationBuilder.CreateIndex(
                name: "IX_AuditQueries_CorrelationId",
                table: "AuditQueries",
                column: "CorrelationId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditQueries_Date",
                table: "AuditQueries",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_AuditQueries_Id",
                table: "AuditQueries",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_AuditQueries_ImpersonatedUserId",
                table: "AuditQueries",
                column: "ImpersonatedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditQueries_QueryName",
                table: "AuditQueries",
                column: "QueryName");

            migrationBuilder.CreateIndex(
                name: "IX_AuditQueries_QueryResultName",
                table: "AuditQueries",
                column: "QueryResultName");

            migrationBuilder.CreateIndex(
                name: "IX_AuditQueries_UserId",
                table: "AuditQueries",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuditCommands");

            migrationBuilder.DropTable(
                name: "AuditDatabaseChanges");

            migrationBuilder.DropTable(
                name: "AuditEvents");

            migrationBuilder.DropTable(
                name: "AuditQueries");
        }
    }
}
