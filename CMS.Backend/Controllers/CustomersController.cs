using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    public class CustomersController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CustomersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Danh sách
        public IActionResult Index()
        {
            var data = _context.Customers.ToList();
            return View(data);
        }

        // ======================
        // CREATE
        // ======================
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Customer customer)
        {
            if (ModelState.IsValid)
            {
                _context.Customers.Add(customer);
                _context.SaveChanges();

                return RedirectToAction(nameof(Index));
            }

            return View(customer);
        }

        // ======================
        // EDIT
        // ======================
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var customer = _context.Customers.Find(id);

            if (customer == null)
                return NotFound();

            return View(customer);
        }

        [HttpPost]
        public IActionResult Edit(Customer customer)
        {
            if (ModelState.IsValid)
            {
                _context.Customers.Update(customer);
                _context.SaveChanges();

                return RedirectToAction(nameof(Index));
            }

            return View(customer);
        }

        // ======================
        // DELETE
        // ======================
        [HttpGet]
        public IActionResult Delete(int id)
        {
            var customer = _context.Customers.Find(id);

            if (customer == null)
                return NotFound();

            return View(customer);
        }

        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirmed(int id)
        {
            var customer = _context.Customers.Find(id);

            if (customer != null)
            {
                _context.Customers.Remove(customer);
                _context.SaveChanges();
            }

            return RedirectToAction(nameof(Index));
        }
    }
}