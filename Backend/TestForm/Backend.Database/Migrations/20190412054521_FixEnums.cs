using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Database.Migrations
{
    public partial class FixEnums : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FieldId2",
                table: "TestObjects");

            migrationBuilder.DropColumn(
                name: "FieldId5Type",
                table: "TestObjects");

            migrationBuilder.AddColumn<string>(
                name: "FieldId2_type",
                table: "TestObjects",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FieldId5_type",
                table: "TestObjects",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FieldId2_type",
                table: "TestObjects");

            migrationBuilder.DropColumn(
                name: "FieldId5_type",
                table: "TestObjects");

            migrationBuilder.AddColumn<int>(
                name: "FieldId2",
                table: "TestObjects",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FieldId5Type",
                table: "TestObjects",
                nullable: true);
        }
    }
}
