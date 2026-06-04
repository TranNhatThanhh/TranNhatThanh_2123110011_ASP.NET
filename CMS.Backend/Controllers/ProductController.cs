using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;


public class ProductController : Controller
{
    private readonly ApplicationDbContext _context;

    public ProductController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        var data = _context.Products.ToList();
        return View(data);
    }

    [HttpGet]
    public IActionResult Create()
    {
        ViewBag.CategoryList = new SelectList(
            _context.CategoriesProducts,
            "Id",
            "Name"
        );

        return View();
    }

    [HttpPost]
    public IActionResult Create(Product product, IFormFile ImageFile)
    {
        if (ImageFile != null)
        {
            string fileName = Guid.NewGuid().ToString()
                            + Path.GetExtension(ImageFile.FileName);

            string uploadFolder = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot/img"
            );

            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            string filePath = Path.Combine(uploadFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                ImageFile.CopyTo(stream);
            }

            product.ImageUrl = "/img/" + fileName;
        }

        _context.Products.Add(product);
        _context.SaveChanges();

        return RedirectToAction(nameof(Index));
    }

    [HttpGet]
    public IActionResult Edit(int id)
    {
        var item = _context.Products.Find(id);

        if (item == null)
            return NotFound();

        return View(item);
    }

    [HttpPost]
    public IActionResult Edit(Product product)
    {
        if (ModelState.IsValid)
        {
            _context.Products.Update(product);
            _context.SaveChanges();
            return RedirectToAction(nameof(Index));
        }
        return View(product);
    }

    [HttpGet]
    public IActionResult Delete(int id)
    {
        var item = _context.Products.Find(id);

        if (item == null)
            return NotFound();

        return View(item);
    }

    [HttpPost, ActionName("Delete")]
    public IActionResult DeleteConfirmed(int id)
    {
        var item = _context.Products.Find(id);

        if (item != null)
        {
            _context.Products.Remove(item);
            _context.SaveChanges();
        }

        return RedirectToAction(nameof(Index));
    }
}