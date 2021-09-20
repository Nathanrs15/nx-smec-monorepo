using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace users_api.Models
{
    public class User
    {
        public string UserName { get; set; }
        public List<string> RoleNames { get; set; }
    }

    public class UpdateUserName
    {
        public string currentUserName { get; set; }
        public string newUserName { get; set; }
    }

    [JsonObject(MemberSerialization.OptOut)]
    public class UserCreate
    {

        public string userName { get; set; }
        public string password { get; set; }
        public string confirmPassword { get; set; }
        public string email { get; set; }
        public List<IdentityRole> roles { get; set; }
 
    }

    public class UpdatePassword
    {
        public string currentPassword { get; set; }
        public string newPassword { get; set; }
        public string confirmPassword { get; set; }
    }

    public class ResetPassword
    {
        public string newPassword { get; set; }
        public string confirmPassword { get; set; }

    }

    public class Role
    {
        public string Name { get; set; }
    }

    public class AddUserRole
    {
        public string Name { get; set; }
        public string Role { get; set; }
    }

    public class ManageUserRolesRequest
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public IEnumerable<UserRolesRequest> UserRoles { get; set; }

    }

    public class UpdateUserRoles
    {
        public string[] Names { get; set; }
        public Dictionary<string, bool> FormValues{ get; set; }
        public IEnumerable<UserRolesRequest> UserRoles { get; set; }
    }

    public class UserRolesRequest
    {
        public string RoleName { get; set; }        
        public bool Selected { get; set; }
    }

}
