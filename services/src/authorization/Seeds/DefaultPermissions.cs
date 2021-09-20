using Shared.Module.Models;
using System;
using System.Collections.Generic;


namespace Authorization.Seeds
{
    public static class DefaultPermissions
    {
        private const string Create = "Create";
        private const string View = "View";
        private const string Edit = "Edit";
        private const string Delete = "Delete";

        public static List<Permission> GetPermissions()
        {
            List<Permission> AllPermissions = new();

            foreach (Resource resource  in DefaultResources.Resources)
            {
                AllPermissions.Add(new Permission { Id = Guid.NewGuid().ToString(), Type = resource.Name, Value = $"{resource.Name}.{View}", Description = $"Permisos para visualizar {resource.Name}", ResourceId = resource.Id, RequestTypeId = 1 });
                AllPermissions.Add(new Permission { Id = Guid.NewGuid().ToString(), Type = resource.Name, Value = $"{resource.Name}.{Create}", Description = $"Permisos para crear {resource.Name}", ResourceId = resource.Id, RequestTypeId = 2 });
                AllPermissions.Add(new Permission { Id = Guid.NewGuid().ToString(), Type = resource.Name, Value = $"{resource.Name}.{Edit}", Description = $"Permisos para editar {resource.Name}", ResourceId = resource.Id, RequestTypeId = 3 });
                AllPermissions.Add(new Permission { Id = Guid.NewGuid().ToString(), Type = resource.Name, Value = $"{resource.Name}.{Delete}", Description = $"Permisos para eliminar {resource.Name}", ResourceId = resource.Id, RequestTypeId = 4 });
            }

            return AllPermissions;
        }
    }
}
