using Shared.Module.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Authorization.Seeds
{
    public class DefaultResources
    {

        public static IEnumerable<Resource> Resources =>
             new Resource[] 
             { 
                new Resource { Id = 1, Name = "Users", ApiName="api/Users", Description="Users API"},
                new Resource { Id = 2, Name = "Roles", ApiName="api/Roles", Description="Roles API"},
                new Resource { Id = 3, Name = "Permissions", ApiName="api/Permissions", Description="Permissions API"},
                new Resource { Id = 4, Name = "Resources", ApiName="api/Resources", Description="Resources API"},
                new Resource { Id = 5, Name = "Weather", ApiName="api/Weather", Description="Weather API"},
                new Resource { Id = 6, Name = "UserRoles", ApiName="api/UserRoles", Description="UserRoles API"},
             };                    
    }
}
