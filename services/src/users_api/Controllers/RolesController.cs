using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

using users_api.Models;
using users_api.Data;
using Microsoft.EntityFrameworkCore;

using Shared.Module.Constants;
using Shared.Module.Authorization;
using System.Linq;
using Shared.Module.Models;

namespace users_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public RolesController(RoleManager<ApplicationRole> roleManager,
            ApplicationDbContext context)
        {
            _roleManager = roleManager;
            _context = context;
        }

        [PermissionRequirement("Roles", Permissions.View)]
        [HttpGet]
        public async Task<IActionResult> GetRoleList()
        {
            var roles = await _context.Roles.ToListAsync();
            return new ObjectResult(roles);
        }

        [PermissionRequirement("Roles", Permissions.View)]
        [HttpGet("{roleId}")]
        public async Task<IActionResult> GetRoleById(string roleId)
        {
            var role = await _context.Roles.Where(r => r.Id == roleId).FirstOrDefaultAsync();

            return new ObjectResult(role);

        }

        [PermissionRequirement("Roles", Permissions.Create)]
        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] RoleRequest model)
        {
            if (model == null)
            {
                return new StatusCodeResult(500);
            }

            var newRole = model.name.Trim();

            if (await _roleManager.RoleExistsAsync(newRole))
            {
                return new StatusCodeResult(403);
            }

            var result = await _roleManager.CreateAsync(new ApplicationRole(newRole));          

            if (result.Succeeded)
            {
                var role = await _roleManager.FindByNameAsync(newRole);

                return CreatedAtAction(nameof(Create), new { id = newRole }, role);
            }
            else
            {
                return new StatusCodeResult(500);
            }
        }

        [PermissionRequirement("Roles", Permissions.Edit)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResource(string id, ApplicationRole model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            model.Id = id;

            _context.Entry(model).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Roles.Any(e => model.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [PermissionRequirement("Roles", Permissions.Delete)]
        [HttpDelete("Delete/{roleId}")]
        public async Task<IActionResult> DeleteRole(string roleId)
        {
            var role = await _roleManager.FindByIdAsync(roleId);

            if (role != null)
            {
                if( RolePermissionExists(role.Id))
                {
                    var rolePermissions = _context.RolePermissions.Where(x => x.RoleId == role.Id);

                    foreach (var rp in rolePermissions)
                    {
                        _context.Remove(rp);
                    };

                    await _context.SaveChangesAsync();

                }
                await _roleManager.DeleteAsync(role);
                return new StatusCodeResult(201);
            }
            else
            {
                return new BadRequestResult();
            }
        }

        private bool RolePermissionExists(string roleId)
        {
            return _context.RolePermissions.Any(e => e.RoleId == roleId);
        }

    }
}