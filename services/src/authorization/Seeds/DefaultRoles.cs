using Microsoft.AspNetCore.Identity;
using Shared.Module.Constants;
using Shared.Module.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Authorization.Seeds
{
    public static class DefaultRoles
    {
        public static async Task SeedAsync(RoleManager<ApplicationRole> roleManager)
        {
            await roleManager.CreateAsync(new ApplicationRole(Roles.Configurator.ToString()));
            await roleManager.CreateAsync(new ApplicationRole(Roles.Viewer.ToString()));
            await roleManager.CreateAsync(new ApplicationRole(Roles.Administrator.ToString()));
        }
    }
}
