using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CandidateMove.Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddIsLockedToGame : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsLocked",
                table: "Games",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsLocked",
                table: "Games");
        }
    }
}
