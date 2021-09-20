using Microsoft.EntityFrameworkCore;
using smec.Models;

namespace smec.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Focus> Focuses { get; set; }
        public DbSet<Sensor> Sensors { get; set; }
        public DbSet<Analyzer> Analyzers { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<MeasuringComponent> MeasuringComponents { get; set; }

        public DbSet<Periferic> Periferics { get; set; }
        public DbSet<PerifericFormula> PerifericFormulas { get; set; }
        public DbSet<Correction> Corrections { get; set; }




        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Periferic>()
                .HasOne(a => a.PerifericFormula)
                .WithOne(b => b.Periferic)
                .HasForeignKey<PerifericFormula>(b => b.PerifericId);

            modelBuilder.Entity<Correction>()
                 .HasOne(pf => pf.Sensor)
                 .WithMany(p => p.Corrections)
                 .HasForeignKey(c => c.SensorId);

            modelBuilder.Entity<Correction>()
                .HasOne(pf => pf.PerifericFormulas)
                .WithMany(f => f.Corrections)
                .HasForeignKey(c => c.SensorId);

            modelBuilder.Entity<Sensor>()
                .HasOne<Periferic>(s => s.Periferic)
                .WithOne(p => p.Sensor)
                .HasForeignKey<Periferic>(p => p.SensorId);

        }

    }
}
