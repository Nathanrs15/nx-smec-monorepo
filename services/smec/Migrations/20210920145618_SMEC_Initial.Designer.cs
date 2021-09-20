﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using smec.Data;

namespace smec.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20210920145618_SMEC_Initial")]
    partial class SMEC_Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.10")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("smec.Models.Analyzer", b =>
                {
                    b.Property<int>("AnalyzerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("FocusId")
                        .HasColumnType("integer");

                    b.Property<string>("Manufacturer")
                        .HasColumnType("text");

                    b.Property<string>("Model")
                        .HasColumnType("text");

                    b.Property<string>("SerialNumber")
                        .HasColumnType("text");

                    b.HasKey("AnalyzerId");

                    b.HasIndex("FocusId");

                    b.ToTable("Analyzers");
                });

            modelBuilder.Entity("smec.Models.Focus", b =>
                {
                    b.Property<int>("FocusId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("FocusCode")
                        .HasColumnType("text");

                    b.Property<int>("InService")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("FocusId");

                    b.ToTable("Focuses");
                });

            modelBuilder.Entity("smec.Models.MeasuringComponent", b =>
                {
                    b.Property<int>("MeasuringComponentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("MeasuringComponentId");

                    b.ToTable("MeasuringComponents");
                });

            modelBuilder.Entity("smec.Models.Sensor", b =>
                {
                    b.Property<int>("SensorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("AnalyzerId")
                        .HasColumnType("integer");

                    b.Property<int?>("MeasuringComponentId")
                        .HasColumnType("integer");

                    b.Property<int?>("UnitId")
                        .HasColumnType("integer");

                    b.HasKey("SensorId");

                    b.HasIndex("AnalyzerId");

                    b.HasIndex("MeasuringComponentId");

                    b.HasIndex("UnitId");

                    b.ToTable("Sensors");
                });

            modelBuilder.Entity("smec.Models.Unit", b =>
                {
                    b.Property<int>("UnitId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("UnitId");

                    b.ToTable("Units");
                });

            modelBuilder.Entity("smec.Models.Analyzer", b =>
                {
                    b.HasOne("smec.Models.Focus", "Focus")
                        .WithMany("Analyzers")
                        .HasForeignKey("FocusId");

                    b.Navigation("Focus");
                });

            modelBuilder.Entity("smec.Models.Sensor", b =>
                {
                    b.HasOne("smec.Models.Analyzer", "Analyzer")
                        .WithMany("Sensors")
                        .HasForeignKey("AnalyzerId");

                    b.HasOne("smec.Models.MeasuringComponent", "MeasuringComponent")
                        .WithMany()
                        .HasForeignKey("MeasuringComponentId");

                    b.HasOne("smec.Models.Unit", "Unit")
                        .WithMany()
                        .HasForeignKey("UnitId");

                    b.Navigation("Analyzer");

                    b.Navigation("MeasuringComponent");

                    b.Navigation("Unit");
                });

            modelBuilder.Entity("smec.Models.Analyzer", b =>
                {
                    b.Navigation("Sensors");
                });

            modelBuilder.Entity("smec.Models.Focus", b =>
                {
                    b.Navigation("Analyzers");
                });
#pragma warning restore 612, 618
        }
    }
}
