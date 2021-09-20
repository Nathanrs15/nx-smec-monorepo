using Microsoft.AspNetCore.Identity;
using Shared.Module.Constants;
using Shared.Module.Models;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Authorization.Seeds
{
    public static class DefaultUsers
    {
        public static async Task SeedBasicUserAsync(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            var defaultUser = new ApplicationUser
            {
                UserName = "visualizador",
                Email = "visualizador@gmail.com",
                EmailConfirmed = true
            };
            if (userManager.Users.All(u => u.Id != defaultUser.Id))
            {
                var user = await userManager.FindByEmailAsync(defaultUser.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(defaultUser, "Sige!445");
                    await userManager.AddToRoleAsync(defaultUser, Roles.Viewer.ToString());
                }
            }
        }
        public static async Task SeedSuperAdminAsync(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            var defaultUser = new ApplicationUser
            {
                UserName = "administrador",
                Email = "administrador@gmail.com",
                EmailConfirmed = true
            };
            if (userManager.Users.All(u => u.Id != defaultUser.Id))
            {
                var user = await userManager.FindByEmailAsync(defaultUser.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(defaultUser, "Sige!445");
                    await userManager.AddToRoleAsync(defaultUser, Roles.Configurator.ToString());
                    await userManager.AddToRoleAsync(defaultUser, Roles.Viewer.ToString());
                    await userManager.AddToRoleAsync(defaultUser, Roles.Administrator.ToString());
                }
               // await roleManager.SeedClaimsForSuperAdmin();
            }
        }
        //private async static Task SeedClaimsForSuperAdmin(this RoleManager<IdentityRole> roleManager)
        //{
        //    var adminRole = await roleManager.FindByNameAsync("admin");
        //    await roleManager.AddPermissionClaim(adminRole, "Weather");
        //    await roleManager.AddPermissionClaim(adminRole, "Users");
        //    await roleManager.AddPermissionClaim(adminRole, "Roles");
        //    await roleManager.AddPermissionClaim(adminRole, "Permissions");
        //}
        //public static async Task AddPermissionClaim(this RoleManager<IdentityRole> roleManager, IdentityRole role, string module)
        //{
        //    var allClaims = await roleManager.GetClaimsAsync(role);
        //    var allPermissions = Permissions.GeneratePermissionsForModule(module);
        //    foreach (var permission in allPermissions)
        //    {
        //        if (!allClaims.Any(a => a.Type == "Permission" && a.Value == permission))
        //        {
        //            await roleManager.AddClaimAsync(role, new Claim(module, permission));
        //        }
        //    }
        //}
    }
}
