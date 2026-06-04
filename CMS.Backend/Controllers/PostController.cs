using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.IO;
using System.Linq;

namespace CMS.Backend.Controllers
{
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================
        // DANH SÁCH BÀI VIẾT
        // ==========================
        public IActionResult Index(int? id)
        {
            var query = _context.Posts
                .Include(p => p.Category)
                .AsQueryable();

            if (id.HasValue)
            {
                query = query.Where(p => p.CategoryId == id.Value);
            }

            var posts = query
                .OrderByDescending(p => p.CreatedDate)
                .ToList();

            return View(posts);
        }

        // ==========================
        // CHI TIẾT BÀI VIẾT
        // ==========================
        public IActionResult Details(int id)
        {
            var post = _context.Posts
                .Include(p => p.Category)
                .FirstOrDefault(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            return View(post);
        }

        // ==========================
        // CREATE - GET
        // ==========================
        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.CategoryList =
                new SelectList(_context.Categories, "Id", "Name");

            return View();
        }

        // ==========================
        // CREATE - POST
        // ==========================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Post model, IFormFile uploadImage)
        {
            if (ModelState.IsValid)
            {
                model.CreatedDate = DateTime.Now;

                if (uploadImage != null && uploadImage.Length > 0)
                {
                    string folder = Path.Combine(
                        Directory.GetCurrentDirectory(),
                        "wwwroot",
                        "uploads"
                    );

                    if (!Directory.Exists(folder))
                    {
                        Directory.CreateDirectory(folder);
                    }

                    string fileName = Guid.NewGuid().ToString()
                                    + Path.GetExtension(uploadImage.FileName);

                    string filePath = Path.Combine(folder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        uploadImage.CopyTo(stream);
                    }

                    model.ImageUrl = "/uploads/" + fileName;
                }
                else
                {
                    model.ImageUrl = "/img/default.jpg";
                }

                _context.Posts.Add(model);
                _context.SaveChanges();

                return RedirectToAction(nameof(Index));
            }

            ViewBag.CategoryList =
                new SelectList(_context.Categories, "Id", "Name");

            return View(model);
        }

        // ==========================
        // EDIT - GET
        // ==========================
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var post = _context.Posts.FirstOrDefault(x => x.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            ViewBag.CategoryList =
                new SelectList(_context.Categories, "Id", "Name", post.CategoryId);

            return View(post);
        }

        // ==========================
        // EDIT - POST
        // ==========================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Post model, IFormFile uploadImage)
        {
            var post = _context.Posts.FirstOrDefault(x => x.Id == model.Id);

            if (post == null)
            {
                return NotFound();
            }
            post.Title = model.Title;
            post.Content = model.Content;
            post.CategoryId = model.CategoryId;

            if (uploadImage != null && uploadImage.Length > 0)
            {
                string folder = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "uploads"
                );

                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                string fileName = Guid.NewGuid().ToString()
                                + Path.GetExtension(uploadImage.FileName);

                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    uploadImage.CopyTo(stream);
                }

                post.ImageUrl = "/uploads/" + fileName;


            }
            
            _context.SaveChanges();

            return RedirectToAction(nameof(Index));
        }

        // ==========================
        // DELETE - GET
        // ==========================
        [HttpGet]
        public IActionResult Delete(int id)
        {
            var post = _context.Posts
                .Include(p => p.Category)
                .FirstOrDefault(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            return View(post);
        }

        // ==========================
        // DELETE - POST
        // ==========================
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            var post = _context.Posts.FirstOrDefault(p => p.Id == id);

            if (post != null)
            {
                _context.Posts.Remove(post);
                _context.SaveChanges();
            }

            return RedirectToAction(nameof(Index));
        }
    }
}