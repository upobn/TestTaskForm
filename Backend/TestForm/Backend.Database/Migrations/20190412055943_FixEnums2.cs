using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Database.Migrations
{
    public partial class FixEnums2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "FieldId5_type",
                table: "TestObjects",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FieldId2_type",
                table: "TestObjects",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "FieldId5_type",
                table: "TestObjects",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "FieldId2_type",
                table: "TestObjects",
                nullable: true,
                oldClrType: typeof(string));
        }
    }
}
