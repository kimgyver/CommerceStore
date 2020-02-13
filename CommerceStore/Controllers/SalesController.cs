using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CommerceStore.Data;
using CommerceStore.Models;
using System;

namespace CommerceStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SalesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalesDTO>>> GetSales()
        {
            return await _context.Sales
                .OrderByDescending(s => s.DateSold)
                .Include(s => s.Customer)
                .Include(s => s.Product)
                .Include(s => s.Store)
                .Select(s =>
                   new SalesDTO()
                   {
                       Id = s.Id,
                       CustomerId = s.CustomerId,
                       ProductId = s.ProductId,
                       StoreId = s.StoreId,
                       DateSold = s.DateSold,
                       CustomerName = s.Customer.Name,
                       ProductName = s.Product.Name,
                       StoreName = s.Store.Name
                   })
                .ToListAsync();
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SalesDTO>> GetSales(int id)
        {
            var sales = await _context.Sales
                .Include(s => s.Customer)
                .Include(s => s.Product)
                .Include(s => s.Store)
                .Select(s =>
                   new SalesDTO()
                   {
                       Id = s.Id,
                       CustomerId = s.CustomerId,
                       ProductId = s.ProductId,
                       StoreId = s.StoreId,
                       DateSold = s.DateSold,
                       CustomerName = s.Customer.Name,
                       ProductName = s.Product.Name,
                       StoreName = s.Store.Name
                   })
                .SingleOrDefaultAsync(s => s.Id == id);

            if (sales == null)
            {
                return NotFound();
            }

            return sales;
        }

        // PUT: api/Sales/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<ActionResult<SalesDTO>> PutSales(int id, Sales sales)
        {
            if (id != sales.Id)
            {
                return BadRequest();
            }

            _context.Entry(sales).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            _context.Entry(sales).Reference(x => x.Customer).Load();
            _context.Entry(sales).Reference(x => x.Product).Load();
            _context.Entry(sales).Reference(x => x.Store).Load();

            var dto = new SalesDTO()
            {
                Id = sales.Id,
                CustomerId = sales.CustomerId,
                ProductId = sales.ProductId,
                StoreId = sales.StoreId,
                DateSold = sales.DateSold,
                CustomerName = sales.Customer.Name,
                ProductName = sales.Product.Name,
                StoreName = sales.Store.Name
            };

            return dto;
            //return NoContent();
        }

        // POST: api/Sales
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<SalesDTO>> PostSales(Sales sales)
        {
            sales.CreatedAt = DateTime.Now;
            _context.Sales.Add(sales);
            await _context.SaveChangesAsync();

            _context.Entry(sales).Reference(x => x.Customer).Load();
            _context.Entry(sales).Reference(x => x.Product).Load();
            _context.Entry(sales).Reference(x => x.Store).Load();

            var dto = new SalesDTO()
            {
                Id = sales.Id,
                CustomerId = sales.CustomerId,
                ProductId = sales.ProductId,
                StoreId = sales.StoreId,
                DateSold = sales.DateSold,
                CustomerName = sales.Customer.Name,
                ProductName = sales.Product.Name,
                StoreName = sales.Store.Name
            };

            //return CreatedAtRoute("GetSales", new { id = sales.Id }, dto);
            return dto;
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sales>> DeleteSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);
            if (sales == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sales);
            await _context.SaveChangesAsync();

            return sales;
        }

        private bool SalesExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }
    }
}
