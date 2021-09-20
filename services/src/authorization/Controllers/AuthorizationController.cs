using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Shared.Module.Models;

namespace Authorization.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly ApplicationDbContext _context;

        public AuthorizationController (UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }


        [HttpPost]
        public async Task<IActionResult> IsUserAuthorized([FromBody] AuthModel model)
        {
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(model.Token.Replace("Bearer ", string.Empty));
            var token = jsonToken as JwtSecurityToken;

            var userId = token.Claims.First(c => c.Type == "sub").Value;

            ApplicationUser user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            var userRoleNames = await _userManager.GetRolesAsync(user);

            List<ApplicationRole> userRoles = _roleManager.Roles.Where(x => userRoleNames.Contains(x.Name)).ToList();


            foreach (var role in userRoles)
            {
                var rolePermissions = _context.RolePermissions.Where(x => x.RoleId == role.Id);

                var requierement = $"{model.Type}.{model.RequirementPermission}";

                var permissions = rolePermissions.Where(x => x.Permission.Value == requierement)
                                                .Select(x => x.Permission.Value);

                if (permissions.Any())
                {
                    Console.WriteLine($"Permission type {model.Type}. {model.RequirementPermission} is authorized");

                    return new ObjectResult(new { IsUserAuthorized = true });
                }

            }

            Console.WriteLine($"Permission type {model.Type}. {model.RequirementPermission} is not authorized");

            return new ObjectResult(new AuthResponse () { IsUserAuthorized = false });

        }
    }
}
