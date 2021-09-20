using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shared.Module.Models;
using users_api.Data;

namespace Users.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolePermissionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RolePermissionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/RolePermissions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RolePermission>>> GetRolePermissions()
        {
            return await _context.RolePermissions.ToListAsync();
        }

        // GET: api/RolePermissions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RolePermission>> GetRolePermission(string id)
        {
            var rolePermission = await _context.RolePermissions.FindAsync(id);

            if (rolePermission == null)
            {
                return NotFound();
            }

            return rolePermission;
        }

        // PUT: api/RolePermissions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRolePermission(string id, RolePermission rolePermission)
        {
            if (id != rolePermission.Id)
            {
                return BadRequest();
            }

            _context.Entry(rolePermission).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RolePermissionExists(id))
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

        // POST: api/RolePermissions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RolePermission>> PostRolePermission(RolePermission rolePermission)
        {
            _context.RolePermissions.Add(rolePermission);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RolePermissionExists(rolePermission.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRolePermission", new { id = rolePermission.Id }, rolePermission);
        }

        // DELETE: api/RolePermissions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRolePermission(string id)
        {
            var rolePermission = await _context.RolePermissions.FindAsync(id);
            if (rolePermission == null)
            {
                return NotFound();
            }

            _context.RolePermissions.Remove(rolePermission);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RolePermissionExists(string id)
        {
            return _context.RolePermissions.Any(e => e.Id == id);
        }
    }
}
