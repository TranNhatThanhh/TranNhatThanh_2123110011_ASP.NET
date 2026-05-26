using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data; // Th? m?c ch?a DbContext
using System.Linq;

public class HomeController : Controller
{
    private readonly ApplicationDbContext _context;

    public HomeController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        // LINQ Method Syntax: L?y 3 bài vi?t m?i nh?t t? SQL Server
        var latestPosts = _context.Posts
                                  .Include(p => p.Category) // L?y kèm tên danh m?c ?? hi?n th? ngoài giao di?n
                                  .OrderByDescending(p => p.Id) // S?p x?p theo Id gi?m d?n ?? l?y bài m?i nh?t mà không lo l?i l?ch tr??ng d? li?u
                                  .Take(3) // Ch? l?y ?úng 3 b?n tin ??u tiên
                                  .ToList();

        return View(latestPosts);
    }
}

