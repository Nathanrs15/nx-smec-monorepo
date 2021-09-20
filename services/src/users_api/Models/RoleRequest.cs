using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace users_api.Models
{
    public class RoleRequest
    {
        public string name { get; set; }
    }

    public class PermissionRequest
    {
        public string RoleId { get; set; }
        public string RoleName { get; set; }
        public IEnumerable<RoleClaimsRequest> RoleClaims { get; set; }      
    }

    public class PermissionGroupRequest
    {
        public string RoleId { get; set; }
        public IEnumerable<PermissionGroup> RoleClaims { get; set; }
    }

    public class PermissionGroup
    {
        public string Type { get; set; }
        public IEnumerable<RoleClaimsRequest> RoleClaims { get; set; }

    }


    public class RoleClaimsRequest
    {
        public string PermissionId { get; set; }
        public string Type { get; set; }
        public string Value { get; set; }
        public string Description { get; set; }
        public bool Selected { get; set; }
    }
}
