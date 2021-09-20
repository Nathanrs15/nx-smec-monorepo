using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

using System.Threading.Tasks;
using System.Linq;

using users_api.Data;
using users_api.Models;

using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

using Shared.Module.Constants;
using Shared.Module.Authorization;
using Shared.Module.Models;
using System.Collections.Generic;

namespace users_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        #region Constructor
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(
            RoleManager<ApplicationRole> roleManager,
            UserManager<ApplicationUser> userManager,
            ApplicationDbContext context
            )
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _context = context;

        }
        #endregion

        [PermissionRequirement("Users", Permissions.View)]
        [HttpGet("{id}/all")]
        public async Task<IActionResult> GetUserListAsync(string id)
        {
            var currentUser = await _userManager.FindByIdAsync(id);
            var allUsersExceptCurrentUser = await _userManager.Users.Where(a => a.Id != currentUser.Id).ToListAsync();

            var result = new List<object>();

            foreach (var u in allUsersExceptCurrentUser)
            {
                result.Add(new
                {
                    Id = u.Id,
                    UserName = u.UserName,
                    NormalizedUserName = u.NormalizedUserName,
                    Email = u.Email,
                    roles = await _userManager.GetRolesAsync(u)
                });
            }

            return new ObjectResult(result);
        }

        [PermissionRequirement("Users", Permissions.View)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            var claims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);

            if (user == null)
            {
                return NotFound();
            }
            return new ObjectResult(new { user, claims, roles });
        }

        [PermissionRequirement("Users", Permissions.Create)]
        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] UserCreate model)
        {
            if (model == null)
            {
                return new StatusCodeResult(500);
            }

                    if (await _userManager.FindByNameAsync(model.userName) == null)
                    {
                        var user = new ApplicationUser { SecurityStamp = System.Guid.NewGuid().ToString(), UserName = model.userName, Email = model.email };
                        var result = await _userManager.CreateAsync(user, model.confirmPassword);

                        if (result.Succeeded)
                        {
                            foreach (var role in model.roles)
                            {
                                if (await _roleManager.RoleExistsAsync(role.Name))
                                {
                                    await _userManager.AddToRoleAsync(user, role.Name);
                                }
                            }
                        }
                    }

            // return new StatusCodeResult(201);

            return CreatedAtAction("Create", model);
        }


        [PermissionRequirement("Users", Permissions.Delete)]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user != null)
            {
                await _userManager.DeleteAsync(user);
                return new StatusCodeResult(201);
            }
            else
            {
                return new BadRequestResult();
            }
        }

        [PermissionRequirement("Users", Permissions.Edit)]
        [HttpPost("update")]
        public async Task<IActionResult> UpdateUserName([FromBody] UpdateUserName model)
        {
            var user = await _userManager.FindByNameAsync(model.currentUserName);
            if (user == null)
            {
                return NotFound();
            }

            user.UserName = model.newUserName;
            await _userManager.UpdateNormalizedUserNameAsync(user);
            await _context.SaveChangesAsync();
            return new StatusCodeResult(201);
        }

        [PermissionRequirement("Users", Permissions.Edit)] // check
        [HttpPost("update/password/{userId}")]
        public async Task<IActionResult> UpdatePassword(string userId, [FromBody] UpdatePassword model)
        {
            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }


            bool checkPassword = await _userManager.CheckPasswordAsync(user, model.currentPassword);

            if (!checkPassword)
            {
                return new BadRequestResult();
            }

            var updatePassWord = await _userManager.ChangePasswordAsync(user, model.currentPassword, model.newPassword);

            if (updatePassWord.Succeeded)
            {
                return new NoContentResult();
            }
            return new BadRequestResult();

        }

        [PermissionRequirement("Users", Permissions.Edit)] // check
        [HttpPost("reset/password/{userId}")]
        public async Task<IActionResult> ResetPassword(string userId, [FromBody] ResetPassword model)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }


            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var resetPassword = await _userManager.ResetPasswordAsync(user, token, model.newPassword);

            if (resetPassword.Succeeded)
            {
                return new StatusCodeResult(201);
            }
            return new BadRequestResult();

        }


        [PermissionRequirement("Users", Permissions.Create)]
        [HttpPost("role/add")]
        public async Task<IActionResult> AddToRole([FromBody] AddUserRole model)
        {
            if (await _roleManager.RoleExistsAsync(model.Role))
            {
                if (await _userManager.FindByNameAsync(model.Name) != null)
                {
                    var user = await _userManager.FindByNameAsync(model.Name);
                    await _userManager.AddToRoleAsync(user, model.Role);
                    return new StatusCodeResult(201);
                }
            }

            return new BadRequestResult();

        }

        [HttpDelete("role/delete/{Name}/{Role}")]
        public async Task<IActionResult> DeleteFromRole(string Name, string Role)
        {
            if (await _roleManager.RoleExistsAsync(Role))
            {
                if (await _userManager.FindByNameAsync(Name) != null)
                {
                    var user = await _userManager.FindByNameAsync(Name);
                    await _userManager.RemoveFromRoleAsync(user, Role);
                    return new StatusCodeResult(201);
                }
                else
                {
                    return new StatusCodeResult(500);
                }
            }
            return new StatusCodeResult(500);

        }

    }
}