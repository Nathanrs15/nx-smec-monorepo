using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using users_api.Models;
using users_api.Data;
using Shared.Module.Constants;
using Shared.Module.Authorization;
using Shared.Module.Models;
using System;
using Microsoft.EntityFrameworkCore;

namespace Users.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public PermissionsController(RoleManager<ApplicationRole> roleManager, ApplicationDbContext context)
        {
            _context = context;
            _roleManager = roleManager;

        }

        // GET: api/Permissions
        [PermissionRequirement("Permissions", Permissions.View)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Permission>>> GetPermissions()
        {
            return await _context.Permissions.ToListAsync();
        }

        // GET: api/Permissions/5
        [PermissionRequirement("Permissions", Permissions.View)]
        [HttpGet("{id}")]
        public async Task<ActionResult<Permission>> GetPermission(string id)
        {
            var permission = await _context.Permissions.FindAsync(id);

            if (permission == null)
            {
                return NotFound();
            }

            return permission;
        }

        // PUT: api/Permissions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [PermissionRequirement("Permissions", Permissions.Edit)]
        [HttpPut("update")]
        public async Task<IActionResult> PutPermission(List<Permission> permissions)
        {
            if (permissions == null)
            {
                return BadRequest();
            }


            permissions.ForEach(p =>
            {
                var existingPermission = _context.Permissions.Find(p.Id);
                _context.Entry(existingPermission).CurrentValues.SetValues(p);
            });

            await _context.SaveChangesAsync();

    
            return NoContent();
        }

        // POST: api/Permissions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [PermissionRequirement("Permissions", Permissions.Create)]
        [HttpPost]
        public async Task<ActionResult<Permission>> PostPermission(Permission permission)
        {
            _context.Permissions.Add(permission);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PermissionExists(permission.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPermission", new { id = permission.Id }, permission);
        }

        // DELETE: api/Permissions/5
        [PermissionRequirement("Permissions", Permissions.Delete)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePermission(string id)
        {
            var permission = await _context.Permissions.FindAsync(id);
            if (permission == null)
            {
                return NotFound();
            }

            _context.Permissions.Remove(permission);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [PermissionRequirement("Permissions", Permissions.View)]
        [HttpGet("{roleId}/GroupByType")]
        public async Task<IActionResult> GetPermissionsByRoleIdGroupBy(string roleId)
        {

            var allPermissions = _context.Permissions.Select(x => new RoleClaimsRequest() { Type = x.Type, Description = x.Description, Value = x.Value, Selected = false });

            var role = await _roleManager.FindByIdAsync(roleId);

            var claims = await _roleManager.GetClaimsAsync(role);
            var allClaimsValues = allPermissions.Select(a => a.Value).ToList();
            var roleClaimsValues = claims.Select(a => a.Value).ToList();
            var authorizedClaims = allClaimsValues.Intersect(roleClaimsValues).ToList();

            var group = allPermissions.Select(p => new { Type = p.Type }).ToList();

            var result = group.GroupBy(x => x.Type).Select(x => x.First());

            return new ObjectResult(result);

        }

        [PermissionRequirement("Permissions", Permissions.View)]
        [HttpGet("{roleId}/{type}")]
        public async Task<IActionResult> GetPermissionsByType(string roleId, string type)
        {

            var allPermissions = _context.Permissions.Select(x => new RoleClaimsRequest() { PermissionId = x.Id, Type = x.Type, Description = x.Description, Value = x.Value, Selected = false }).Where(y => y.Type == type);

            var role = await _roleManager.FindByIdAsync(roleId);
            var rolePermisions = _context.RolePermissions.Where(x => x.RoleId == role.Id).Select(x => x.Permission);

            var allClaimsValues = allPermissions.Select(a => a.Value).ToList();
            var roleClaimsValues = rolePermisions.Select(a => a.Value).ToList();
            var authorizedClaims = allClaimsValues.Intersect(roleClaimsValues).ToList();

            var result = new PermissionRequest()
            {
                RoleId = roleId,
                RoleName = role.Name,
                RoleClaims = allPermissions.Select(p => new RoleClaimsRequest { PermissionId = p.PermissionId,  Type = p.Type, Value = p.Value, Description = p.Description, Selected = authorizedClaims.Any(a => a == p.Value) })
            };

            return new ObjectResult(result);
        }

        [PermissionRequirement("Permissions", Permissions.Edit)]
        [HttpPost("update/{type}")]
        public async Task<IActionResult> UpdatePermissions(string type, [FromBody] PermissionRequest model)
        {
            var role = await _roleManager.FindByIdAsync(model.RoleId);

            if (role == null)
            {
                return new NotFoundResult();
            }


            var rolePermisions = _context.RolePermissions.Where(x => x.RoleId == role.Id && x.Permission.Type == type);

            if (rolePermisions == null)
            {
                return new NotFoundResult();
            }

            foreach (var permission in rolePermisions)
            {
                _context.RolePermissions.Remove(permission);
            }


            var selectedClaims = model.RoleClaims.Where(a => a.Selected && a.Type == type).ToList();


            foreach (var claim in selectedClaims)
            {
                await _context.RolePermissions.AddAsync(new RolePermission { Id = Guid.NewGuid().ToString(), RoleId = role.Id, PermissionId = claim.PermissionId });
            }

            await _context.SaveChangesAsync();

            return new StatusCodeResult(201);
        }

        private bool PermissionExists(string id)
        {
            return _context.Permissions.Any(e => e.Id == id);
        }
    }
}
