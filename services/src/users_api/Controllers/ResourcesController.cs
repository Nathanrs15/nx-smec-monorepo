using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shared.Module.Authorization;
using Shared.Module.Constants;
using Shared.Module.Models;
using users_api.Data;

namespace Users.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourcesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ResourcesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Resources
        [PermissionRequirement("Resources", Permissions.View)]
        [HttpGet]
        public async Task<IActionResult> GetResources()
        {
            var resources = await _context.Resources
                //.Include(r => r.Permissions)
                .ToListAsync();

            return new ObjectResult(resources);
        }

        // GET: api/Resources/5
        [PermissionRequirement("Resources", Permissions.View)]
        [HttpGet("{id}")]
        public async Task<ActionResult<Resource>> GetResource(int id)
        {
            var resource = await _context.Resources.FindAsync(id);

            if (resource == null)
            {
                return NotFound();
            }

            return resource;
        }

        // GET: api/Resources/5/Permissions
        [PermissionRequirement("Resources", Permissions.View)]
        [HttpGet("{id}/Permissions")]
        public async Task<ActionResult> GetResourcePermissions(int id)
        {
            var permissions =  await _context.Permissions.Where(p => p.ResourceId == id).ToListAsync();

            if (permissions == null)
            {
                return NotFound();
            }

            return new ObjectResult(permissions);
        }

        // PUT: api/Resources/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [PermissionRequirement("Resources", Permissions.Edit)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResource(int id, Resource resource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            resource.Id = id;

            _context.Entry(resource).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResourceExists(id))
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

        // POST: api/Resources
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [PermissionRequirement("Resources", Permissions.Create)]
        [HttpPost("Create")]
        public async Task<ActionResult<Resource>> PostResource(Resource resource)
        {
            _context.Resources.Add(resource);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResource", new { id = resource.Id }, resource);
        }

        // DELETE: api/Resources/5
        [PermissionRequirement("Resources", Permissions.Delete)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResource(int id)
        {
            var resource = await _context.Resources.FindAsync(id);
            if (resource == null)
            {
                return NotFound();
            }

            _context.Resources.Remove(resource);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Permissions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [PermissionRequirement("Resources", Permissions.Create)]
        [HttpPost("Permissions")]
        public async Task<IActionResult> PostResourcePermissions(Resource resource)
        {

            var permissions = new Permission[]
            {
                 new Permission { Id = Guid.NewGuid().ToString(), Type = resource.Name, Value = $"{resource.Name}.{Permissions.View}", Description = $"Permisos para visualizar {resource.Name}", ResourceId = resource.Id, RequestTypeId = 1 },
                 new Permission { Id = Guid.NewGuid().ToString(), Type = resource.Name, Value = $"{resource.Name}.{Permissions.Create}", Description =$"Permisos para crear {resource.Name}", ResourceId = resource.Id, RequestTypeId = 2 },
                 new Permission { Id = Guid.NewGuid().ToString(), Type = resource.Name, Value = $"{resource.Name}.{Permissions.Edit}", Description = $"Permisos para editar {resource.Name}", ResourceId = resource.Id, RequestTypeId = 3 },
                 new Permission { Id = Guid.NewGuid().ToString(), Type = resource.Name, Value = $"{resource.Name}.{Permissions.Delete}", Description = $"Permisos para eliminar {resource.Name}", ResourceId = resource.Id, RequestTypeId = 4 }
            };

            await _context.Permissions.AddRangeAsync(permissions);

            await _context.SaveChangesAsync();


            return new StatusCodeResult(201);
        }

        // PUT: api/Resources/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [PermissionRequirement("Resources", Permissions.Edit)]
        [HttpPut("{id}/Permissions")]
        public async Task<IActionResult> PutResourcePermissions(int id, Resource resource)
        {
            var permissions = _context.Permissions.Where(p => p.ResourceId == id);

            var requestTypes = _context.RequestTypes.ToList();

            await permissions.ForEachAsync(p =>
             {
                 
                 p.Type = resource.Name;
                 p.Value = $"{resource.Name}.{requestTypes.Find(x => x.Id == p.RequestTypeId).Name}";
             });
      
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Permissions.Any(p => p.ResourceId == id))
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

        private bool ResourceExists(int id)
        {
            return _context.Resources.Any(e => e.Id == id);
        }
    }
}
