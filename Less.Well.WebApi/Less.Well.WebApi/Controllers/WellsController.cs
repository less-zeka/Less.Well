using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Less.Well.WebApi.Models;

namespace Less.Well.WebApi.Controllers
{
    public class WellsController : ApiController
    {
        private LessWellWebApiContext db = new LessWellWebApiContext();

        // GET: api/Wells
        public IQueryable<Models.Well> GetWells()
        {
            return db.Wells;
        }

        // GET: api/Wells/5
        [ResponseType(typeof(Models.Well))]
        public async Task<IHttpActionResult> GetWell(int id)
        {
            var well = await db.Wells.FindAsync(id);
            if (well == null)
            {
                return NotFound();
            }

            return Ok(well);
        }

        // PUT: api/Wells/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutWell(int id, Models.Well well)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != well.Id)
            {
                return BadRequest();
            }

            db.Entry(well).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WellExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Wells
        [ResponseType(typeof(Models.Well))]
        public async Task<IHttpActionResult> PostWell(Models.Well well)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Wells.Add(well);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = well.Id }, well);
        }

        // DELETE: api/Wells/5
        [ResponseType(typeof(Models.Well))]
        public async Task<IHttpActionResult> DeleteWell(int id)
        {
            var well = await db.Wells.FindAsync(id);
            if (well == null)
            {
                return NotFound();
            }

            db.Wells.Remove(well);
            await db.SaveChangesAsync();

            return Ok(well);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool WellExists(int id)
        {
            return db.Wells.Count(e => e.Id == id) > 0;
        }
    }
}