using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace smec.Migrations
{
    public partial class SMEC_Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Focuses",
                columns: table => new
                {
                    FocusId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FocusCode = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    InService = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Focuses", x => x.FocusId);
                });

            migrationBuilder.CreateTable(
                name: "MeasuringComponents",
                columns: table => new
                {
                    MeasuringComponentId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MeasuringComponents", x => x.MeasuringComponentId);
                });

            migrationBuilder.CreateTable(
                name: "Units",
                columns: table => new
                {
                    UnitId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Units", x => x.UnitId);
                });

            migrationBuilder.CreateTable(
                name: "Analyzers",
                columns: table => new
                {
                    AnalyzerId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Manufacturer = table.Column<string>(type: "text", nullable: true),
                    Model = table.Column<string>(type: "text", nullable: true),
                    SerialNumber = table.Column<string>(type: "text", nullable: true),
                    FocusId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Analyzers", x => x.AnalyzerId);
                    table.ForeignKey(
                        name: "FK_Analyzers_Focuses_FocusId",
                        column: x => x.FocusId,
                        principalTable: "Focuses",
                        principalColumn: "FocusId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Sensors",
                columns: table => new
                {
                    SensorId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AnalyzerId = table.Column<int>(type: "integer", nullable: true),
                    MeasuringComponentId = table.Column<int>(type: "integer", nullable: true),
                    UnitId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sensors", x => x.SensorId);
                    table.ForeignKey(
                        name: "FK_Sensors_Analyzers_AnalyzerId",
                        column: x => x.AnalyzerId,
                        principalTable: "Analyzers",
                        principalColumn: "AnalyzerId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Sensors_MeasuringComponents_MeasuringComponentId",
                        column: x => x.MeasuringComponentId,
                        principalTable: "MeasuringComponents",
                        principalColumn: "MeasuringComponentId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Sensors_Units_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Units",
                        principalColumn: "UnitId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Analyzers_FocusId",
                table: "Analyzers",
                column: "FocusId");

            migrationBuilder.CreateIndex(
                name: "IX_Sensors_AnalyzerId",
                table: "Sensors",
                column: "AnalyzerId");

            migrationBuilder.CreateIndex(
                name: "IX_Sensors_MeasuringComponentId",
                table: "Sensors",
                column: "MeasuringComponentId");

            migrationBuilder.CreateIndex(
                name: "IX_Sensors_UnitId",
                table: "Sensors",
                column: "UnitId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sensors");

            migrationBuilder.DropTable(
                name: "Analyzers");

            migrationBuilder.DropTable(
                name: "MeasuringComponents");

            migrationBuilder.DropTable(
                name: "Units");

            migrationBuilder.DropTable(
                name: "Focuses");
        }
    }
}
