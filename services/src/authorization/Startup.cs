using Authorization.Seeds;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Shared.Module.Constants;
using Shared.Module.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Authorization
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));


            services.AddIdentity<ApplicationUser, ApplicationRole>()
                    .AddRoles<ApplicationRole>()
                    .AddRoleManager<RoleManager<ApplicationRole>>()
                    .AddDefaultTokenProviders()
                    .AddEntityFrameworkStores<ApplicationDbContext>();


            services.AddCors(options => options.AddPolicy("CorsPolicy",
                 builder =>
                 {
                     builder
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .WithOrigins("https://localhost:4200", "http://localhost:4200")
                      .AllowCredentials();
                 }));


            services.AddControllers();
            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Authorization", Version = "v1" });
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("CorsPolicy");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //app.UseSwagger();
                //app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Authorization v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // Do initial migration first
            InitializeDatabase(app);
        }

        private async void InitializeDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();

                var appContext = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                if (!appContext.Resources.Any())
                {
                    Console.WriteLine("Seeding Resources ....");
                    await appContext.Resources.AddRangeAsync(DefaultResources.Resources);
                    await appContext.SaveChangesAsync();
                }

                if (!appContext.RequestTypes.Any())
                {
                    Console.WriteLine("Seeding RequestTypes ....");
                    await appContext.RequestTypes.AddRangeAsync(DefaultRequestTypes.RequestTypes);
                    await appContext.SaveChangesAsync();
                }

                if (!appContext.Permissions.Any())
                {
                    Console.WriteLine("Seeding Permissions ....");
                    var allPermissions = DefaultPermissions.GetPermissions();
            
                    await appContext.Permissions.AddRangeAsync(allPermissions);                        
                   
                    await appContext.SaveChangesAsync();
                }

                if (!appContext.Roles.Any())
                {
                    Console.WriteLine("Seeding Roles ....");
                    await DefaultRoles.SeedAsync(roleManager);
                }

                if (!appContext.RolePermissions.Any())
                {

                    Console.Write("Seeding Role permissions ....");

                    var adminRole = await roleManager.FindByNameAsync(Roles.Administrator.ToString());

                    var permissions = await appContext.Permissions.ToListAsync();

                    List<RolePermission> rolePermissions = new();

                    foreach (Permission p in permissions)
                    {
                        rolePermissions.Add(new RolePermission { Id = Guid.NewGuid().ToString(), RoleId = adminRole.Id, PermissionId = p.Id });
                    }

                    await appContext.RolePermissions.AddRangeAsync(rolePermissions);
                    await appContext.SaveChangesAsync();


                }

                if (!appContext.Users.Any())
                {
                    Console.Write("Seeding Users ....");
                    await DefaultUsers.SeedSuperAdminAsync(userManager, roleManager);
                    await DefaultUsers.SeedBasicUserAsync(userManager, roleManager);
                }

                Console.Write("Seeding Ended ....");


            }
        }
    }
}

// dotnet ef migrations add {{name}} --context ConfigurationDbContext
// dotnet ef migrations add {{name}} --context PersistedGrantDbContext
// dotnet ef migrations add {{name}} --context ApplicationDbContext

// dotnet ef database update --context {{context}}