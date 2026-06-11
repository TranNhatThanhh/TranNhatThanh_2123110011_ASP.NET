using CMS.Data;
using CMS.Data.Entities; // Kết nối tới lớp dữ liệu bạn vừa tạo
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

[Authorize]
public class CategoryController : Controller
{
    private readonly ApplicationDbContext _context;

    // "Tiêm" kết nối vào Controller
    public CategoryController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        // Lấy dữ liệu THẬT từ bảng Categories trong SQL
        var data = _context.Categories.ToList();
        return View(data);
    }

    // ==================== THÊM MỚI: CHỨC NĂNG THÊM DANH MỤC ====================

    // 1. Hàm GET: Dùng để hiển thị giao diện Form cho người dùng nhập liệu
    [HttpGet]
    public IActionResult Create()
    {
        return View();
    }

    // 2. Hàm POST: Dùng để đón dữ liệu từ Form gửi lên và lưu vào SQL Server
    [HttpPost]
    public IActionResult Create(Category model)
    {
        // BƯỚC 1: Thêm dữ liệu vào bộ nhớ tạm của Entity Framework
        _context.Categories.Add(model);

        // BƯỚC 2: Ra lệnh cho hệ thống ghi dữ liệu thật sự vào SQL Server
        _context.SaveChanges();

        // Sau khi lưu thành công, tự động quay về trang danh sách Index
        return RedirectToAction("Index");
    }

    // ==================== CẬP NHẬT: CHỨC NĂNG SỬA DANH MỤC ====================

    // 1. Hàm GET: Tìm danh mục cần sửa theo Id và nạp dữ liệu cũ lên Form
    [HttpGet]
    public IActionResult Edit(int id)
    {
        // Tìm bản ghi trong SQL Server dựa vào mã id truyền vào
        var category = _context.Categories.FirstOrDefault(c => c.Id == id);

        if (category == null)
        {
            return NotFound(); // Trả về trang lỗi 404 nếu không tìm thấy danh mục
        }

        return View(category);
    }

    // 2. Hàm POST: Nhận dữ liệu mới thay đổi từ Form gửi lên để cập nhật vào Database
    [HttpPost]
    public IActionResult Edit(Category model)
    {
        // BƯỚC 1: Đăng ký thay đổi đối tượng vào bộ nhớ tạm
        _context.Categories.Update(model);

        // BƯỚC 2: Chốt đơn - Đẩy lệnh UPDATE vào SQL Server
        _context.SaveChanges();

        return RedirectToAction("Index");
    }

    // ==================== LOẠI BỎ: CHỨC NĂNG XÓA DANH MỤC ====================

    // 1. Hàm GET: Tìm danh mục cần xóa để hiển thị giao diện xác nhận xóa
    [HttpGet]
    public IActionResult Delete(int id)
    {
        var category = _context.Categories.FirstOrDefault(c => c.Id == id);

        if (category == null)
        {
            return NotFound();
        }

        return View(category);
    }

    // 2. Hàm POST: Thực thi xóa dữ liệu khi người dùng ấn nút "Xác nhận xóa"
    [HttpPost, ActionName("Delete")]
    public IActionResult DeleteConfirmed(int id)
    {
        var category = _context.Categories.FirstOrDefault(c => c.Id == id);

        if (category != null)
        {
            // BƯỚC 1: Đăng ký xóa bản ghi này khỏi bộ nhớ tạm
            _context.Categories.Remove(category);

            // BƯỚC 2: Chốt đơn - Đẩy lệnh DELETE trực tiếp vào SQL Server
            _context.SaveChanges();
        }

        return RedirectToAction("Index");
    }
}