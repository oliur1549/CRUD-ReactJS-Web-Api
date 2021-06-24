using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ReactAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [EnableCors("AllowOrigin")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private ApplicationDbContext db;
        public EmployeeController(ApplicationDbContext con)
        {
            db = con;
        }
        // GET: EmployeeController
        [HttpGet]
        [EnableCors("AllowOrigin")]
        public JsonResult Get()
        {
            var result = db.employees.ToList();
            return new JsonResult(result);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetbyId(int id)
        {
            var get = await db.employees.FindAsync(id);
            if (get == null)
            {
                return NotFound();
            }
            return get;
        }
        [HttpPost]
        public JsonResult Post([FromBody] Employee employee)
        {
            var result = db.employees.Add(employee);
            db.SaveChanges();
            return new JsonResult(result);
        }
        //[HttpGet("{id}")]
        //public JsonResult Put(int id)
        //{
        //    //var emp = db.employees.Where(s => s.Id == employee.Id)
        //    //                                        .FirstOrDefault<Employee>();
        //    var model = new Employee();
        //    model.Id = id;

        //    return new JsonResult(model);
        //}
        //[HttpPut]
        //public JsonResult Put([FromBody] Employee employee)
        //{
        //    //var emp = db.employees.Where(s => s.Id == employee.Id)
        //    //                                        .FirstOrDefault<Employee>();
        //    var emp = db.employees.Update(employee);
        //    db.SaveChanges();

        //    return new JsonResult(emp);
        //}
        [HttpPut]
        public async Task<JsonResult> Put(Employee emp)
        {
            db.Entry(emp).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }

            return new JsonResult(emp);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> Delete(int id)
        {
            var bookItem = await db.employees.FindAsync(id);
            if (bookItem == null)
            {
                return NotFound();
            }

            db.employees.Remove(bookItem);
            await db.SaveChangesAsync();

            return bookItem;
        }
    }
}
