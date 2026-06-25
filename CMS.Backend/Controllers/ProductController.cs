using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;


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
                "wwwroot/uploads"
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

            product.ImageUrl = "/uploads/" + fileName;
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

        ViewBag.CategoryList = new SelectList(
            _context.CategoriesProducts,
            "Id",
            "Name",
            item.CategoryProductId
        );

        return View(item);
    }

    [HttpPost]
    public IActionResult Edit(Product product, IFormFile? ImageFile)
    {
        var oldProduct = _context.Products
            .FirstOrDefault(x => x.Id == product.Id);

        if (oldProduct == null)
            return NotFound();

        if (ImageFile != null)
        {
            string fileName = Guid.NewGuid().ToString()
                            + Path.GetExtension(ImageFile.FileName);

            string uploadFolder = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot/uploads"
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

            product.ImageUrl = "/uploads/" + fileName;
        }
        else
        {
            product.ImageUrl = oldProduct.ImageUrl;
        }

        _context.Entry(oldProduct).CurrentValues.SetValues(product);
        _context.SaveChanges();

        return RedirectToAction(nameof(Index));
    }
    public IActionResult Details(int id)
    {
        var product = _context.Products
            .Include(p => p.CategoryProduct)
            .FirstOrDefault(p => p.Id == id);

        if (product == null)
        {
            return NotFound();
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
    [HttpGet]
    public async Task<IActionResult> GetAllProducts([FromQuery] int page = 1, [FromQuery] int pageSize = 8)
    {
        if (page < 1) page = 1;

        // 1. Tính tổng số sản phẩm đang có trong Database
        var totalItems = await _context.Products.CountAsync();

        // 2. Tính tổng số trang dựa trên pageSize (ví dụ: 17 sản phẩm / 8 = 3 trang)
        var totalPages = (int)Math.Ceiling((double)totalItems / pageSize);

        // 3. Lấy dữ liệu phân trang bằng lệnh Skip() và Take()
        var data = await _context.Products
            .Include(p => p.CategoryProduct)
            .OrderByDescending(p => p.Id) // Hiện sản phẩm mới nhất lên đầu
            .Skip((page - 1) * pageSize)  // Bỏ qua các sản phẩm của trang trước
            .Take(pageSize)               // Lấy đúng số lượng của trang hiện tại
            .ToListAsync();

        // 4. Trả về đối tượng JSON bọc đầy đủ thông tin bổ trợ cho React
        return Ok(new
        {
            TotalItems = totalItems,
            TotalPages = totalPages,
            CurrentPage = page,
            PageSize = pageSize,
            Data = data
        });
    }
}