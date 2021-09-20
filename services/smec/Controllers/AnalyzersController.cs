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
    public class AnalyzersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AnalyzersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Analyzers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Analyzer>>> GetAnalyzers()
        {
            return await _context.Analyzers.ToListAsync();
        }

        // GET: api/Analyzers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Analyzer>> GetAnalyzer(int id)
        {
            var analyzer = await _context.Analyzers.FindAsync(id);

            if (analyzer == null)
            {
                return NotFound();
            }

            return analyzer;
        }

        // PUT: api/Analyzers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnalyzer(int id, Analyzer analyzer)
        {
            if (id != analyzer.AnalyzerId)
            {
                return BadRequest();
            }

            _context.Entry(analyzer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnalyzerExists(id))
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

        // POST: api/Analyzers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Analyzer>> PostAnalyzer(Analyzer analyzer)
        {
            _context.Analyzers.Add(analyzer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAnalyzer", new { id = analyzer.AnalyzerId }, analyzer);
        }

        // DELETE: api/Analyzers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnalyzer(int id)
        {
            var analyzer = await _context.Analyzers.FindAsync(id);
            if (analyzer == null)
            {
                return NotFound();
            }

            _context.Analyzers.Remove(analyzer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnalyzerExists(int id)
        {
            return _context.Analyzers.Any(e => e.AnalyzerId == id);
        }
    }
}
