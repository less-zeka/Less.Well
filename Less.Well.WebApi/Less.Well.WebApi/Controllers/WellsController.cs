using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Less.Well.WebApi.Models;
using Less.Well.WebApi.Utils;

namespace Less.Well.WebApi.Controllers
{
    [EnableCors(origins: "http://elixir.cheese-maker.ch, http://localhost:64129, http://open-source.tips", headers: "*", methods: "*")]
    public class WellsController : ApiController
    {
        private readonly LessWellWebApiContext _database = new LessWellWebApiContext();

        // GET: api/Wells
        // GET: api/Routes?longitude=7.4792713&latitude=46.9742651
        [HttpGet]
        [ResponseType(typeof (IQueryable<Models.Well>))]
        public IHttpActionResult GetWells(double lat, double lon)
        {
            var userLocation = GeoUtils.CreatePoint(lat, lon);
            var nearestWells = (from u in _database.Wells
                orderby u.DbGeography.Distance(userLocation)
                select u).Take(5);
            return Ok(nearestWells);
        }

        // just for temp use?!
        [Route("test")] // <-- notice the route here
        [HttpGet]
        public IHttpActionResult CleanUpWells()
        {
            foreach (var well in _database.Wells)
            {
                if (well.DbGeography == null)
                {
                    well.DbGeography = GeoUtils.CreatePoint(well.Latitude, well.Longitude);
                }
            }
            _database.SaveChanges();
            return Ok();
        }

        //public IQueryable<Models.Well> GetWells()
        //{
        //    return db.Wells;
        //}

        // GET: api/Wells/5
        [ResponseType(typeof (Models.Well))]
        public async Task<IHttpActionResult> GetWell(int id)
        {
            var well = await _database.Wells.FindAsync(id);
            if (well == null)
            {
                return NotFound();
            }

            return Ok(well);
        }

        // PUT: api/Wells/5
        [ResponseType(typeof (void))]
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

            _database.Entry(well).State = EntityState.Modified;

            try
            {
                await _database.SaveChangesAsync();
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
        [ResponseType(typeof (Models.Well))]
        [HttpPost]
        public async Task<IHttpActionResult> PostWell(Models.Well well)
        //public async Task<IHttpActionResult> PostWell(double lat, double lon)
        {
            if(!ModelIsValid(well))
            {
                return BadRequest(ModelState);
            }

            _database.Wells.Add(well);
            await _database.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new {id = well.Id}, well);
        }

        private bool ModelIsValid(Models.Well well)
        {
            if (well.DbGeography == null)
            {
                if (!(Math.Abs(well.Latitude) < 0.0 || Math.Abs(well.Longitude) < 0.0))
                {
                    well.DbGeography = GeoUtils.CreatePoint(well.Latitude, well.Longitude);
                }
                else
                {
                    return false;
                }
            }

            return ModelState.IsValid;
        }

        // DELETE: api/Wells/5
        [ResponseType(typeof (Models.Well))]
        public async Task<IHttpActionResult> DeleteWell(int id)
        {
            var well = await _database.Wells.FindAsync(id);
            if (well == null)
            {
                return NotFound();
            }

            _database.Wells.Remove(well);
            await _database.SaveChangesAsync();

            return Ok(well);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _database.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool WellExists(int id)
        {
            return _database.Wells.Count(e => e.Id == id) > 0;
        }
    }
}