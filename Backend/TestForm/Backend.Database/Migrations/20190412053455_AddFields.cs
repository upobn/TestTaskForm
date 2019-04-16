using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Database.Migrations
{
    public partial class AddFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FieldId2",
                table: "TestObjects",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "FieldId3",
                table: "TestObjects",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "FieldId4",
                table: "TestObjects",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FieldId5Type",
                table: "TestObjects",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FieldId2",
                table: "TestObjects");

            migrationBuilder.DropColumn(
                name: "FieldId3",
                table: "TestObjects");

            migrationBuilder.DropColumn(
                name: "FieldId4",
                table: "TestObjects");

            migrationBuilder.DropColumn(
                name: "FieldId5Type",
                table: "TestObjects");
        }
    }
}
