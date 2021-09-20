
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using users_api.Models;

using Shared.Module.Constants;
using Shared.Module.Authorization;
using Shared.Module.Models;

namespace users_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRolesController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserRolesController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<ApplicationRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        [PermissionRequirement("UserRoles", Permissions.View)]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserRoles(string userId)
        {
            
            var user = await _userManager.FindByIdAsync(userId);
            var user_roles = await _userManager.GetRolesAsync(user);

           
            var result = new ManageUserRolesRequest()
            {
                UserId = userId,
                UserName = user.UserName,
                UserRoles = _roleManager.Roles.Select(r => new UserRolesRequest { RoleName = r.Name, Selected = user_roles.Contains(r.Name) })
            };

            return new ObjectResult(result);
        }

        [PermissionRequirement("UserRoles", Permissions.Edit)]
        [HttpPost("update/{userId}")]
        public async Task<IActionResult> UpdateUserRoles(string userId, [FromBody] UpdateUserRoles data)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                
                    Console.WriteLine("user");
                    return new NotFoundResult();
            }

            var roles = await _userManager.GetRolesAsync(user);

            if (roles == null)
            {
                Console.WriteLine("roles");

                return new NotFoundResult();
            }

            var valuesToUpdate = data.UserRoles.ToList();


            foreach (var name in data.Names)
            {
                UserRolesRequest updateItem = data.UserRoles.FirstOrDefault(x => x.RoleName == name);

                if (updateItem != null)
                {
                    updateItem.Selected = data.FormValues[name];

                    var index = valuesToUpdate.IndexOf(updateItem);
                    valuesToUpdate[index] = updateItem;

                    data.UserRoles = valuesToUpdate;
                    

                }
            }


            var result = await _userManager.RemoveFromRolesAsync(user, roles);
            result = await _userManager.AddToRolesAsync(user, data.UserRoles.Where(x => x.Selected).Select(y => y.RoleName));


            await _signInManager.RefreshSignInAsync(user);

            return new StatusCodeResult(201);
        }
    }
}
