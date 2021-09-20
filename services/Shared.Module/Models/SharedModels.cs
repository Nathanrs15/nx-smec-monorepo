using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shared.Module.Models
{
    public class AuthModel
    {
        public string Token { get; set; }
        public string Type { get; set; }
        public string RequirementPermission { get; set; }
    }

    public class AuthResponse
    {
        public bool IsUserAuthorized { get; set; }
    }

    public class RequestType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Method { get; set; }
        public ICollection<Permission> Permissions { get; set; }
    }

    public class Resource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ApiName { get; set; }
        public string Description { get; set; }
        public ICollection<Permission> Permissions { get; set; }
    }

    public class Permission
    {
        public string Id { get; set; }
        public string Type { get; set; }
        public string Value { get; set; }
        public string Description { get; set; }
        public int ResourceId { get; set; }
        public int RequestTypeId { get; set; }

        public RequestType RequestType { get; set; }
        public Resource Resource { get; set; }
    }

    public class RolePermission
    {
        public string Id { get; set; }
        [ForeignKey("ApplicationRole")]
        public string RoleId { get; set; }
        public string PermissionId { get; set; }        
        public ApplicationRole ApplicationRole { get; set; }
        public Permission Permission { get; set; }


    }

    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole() : base() { }
        public ApplicationRole(string roleName) : base() {
            Name = roleName;
        }
    }

    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser() : base() { }

    }

}
