using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using smec.Data;
using smec.Models;

namespace smec.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FocusController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FocusController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Focus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Focus>>> GetFocuses()
        {
            return await _context.Focuses.ToListAsync();
        }

        // GET: api/Focus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Focus>> GetFocus(int id)
        {
            var focus = await _context.Focuses.FindAsync(id);

            if (focus == null)
            {
                return NotFound();
            }

            return focus;
        }

        // PUT: api/Focus/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFocus(int id, Focus focus)
        {
            if (id != focus.FocusId)
            {
                return BadRequest();
            }

            _context.Entry(focus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FocusExists(id))
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

        // POST: api/Focus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Focus>> PostFocus(Focus focus)
        {
            _context.Focuses.Add(focus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFocus", new { id = focus.FocusId }, focus);
        }

        // DELETE: api/Focus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFocus(int id)
        {
            var focus = await _context.Focuses.FindAsync(id);
            if (focus == null)
            {
                return NotFound();
            }

            _context.Focuses.Remove(focus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FocusExists(int id)
        {
            return _context.Focuses.Any(e => e.FocusId == id);
        }
    }
}
