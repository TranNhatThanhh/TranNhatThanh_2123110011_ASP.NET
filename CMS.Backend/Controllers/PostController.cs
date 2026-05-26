using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using CMS.Data.Entities;
using System.Linq;
using System; // Bắt buộc thêm để dùng DateTime.Now
using Microsoft.EntityFrameworkCore; // Hỗ trợ Eager Loading liên kết dữ liệu giữa các bảng

namespace CMS.Backend.Controllers
{
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        // URL chạy thử linh hoạt: 
        // 1. /Post -> Hiển thị toàn bộ bài viết mới nhất
        // 2. /Post/Index/1 -> Lọc bài viết theo danh mục số 1
        public IActionResult Index(int? id)
        {
            // 1. Khởi tạo câu lệnh truy vấn lấy bảng Posts và gộp (Include) bảng Category
            var query = _context.Posts
                .Include(p => p.Category)
                .AsQueryable();


            // 2. SỬA ĐỔI TẠI ĐÂY: Thay vì trả về BadRequest, ta kiểm tra thông minh
            // Nếu người dùng có truyền id trên URL (?id= hoặc /id) thì mới tiến hành lọc
            if (id != null)
            {
                query = query.Where(p => p.CategoryId == id);
            }

            // 3. Sắp xếp toàn bộ hoặc danh sách đã lọc theo ngày đăng giảm dần
            var posts = query.OrderByDescending(p => p.CreatedDate).ToList();

            // 4. Truyền dữ liệu bài viết thật đã xử lý ra View
            return View(posts);
        }

        // Hàm hiển thị CHI TIẾT bài viết dựa vào Id (Giữ nguyên cấu trúc của bạn)
        public IActionResult Details(int id)
        {
            var post = _context.Posts.FirstOrDefault(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            return View(post);
        }

        // ===================================================================
        // CHỨC NĂNG 1: THÊM MỚI BÀI VIẾT (CREATE)
        // ===================================================================

        // Hàm GET: Hiển thị form trống + Nạp danh sách Category đổ vào Dropdown chọn
        [HttpGet]
        public IActionResult Create()
        {
            // Lấy danh sách danh mục truyền qua ViewBag để hiển thị trên thẻ <select>
            ViewBag.Categories = _context.Categories.ToList();
            return View();
        }

        // Hàm POST: Đón nhận dữ liệu từ Form gửi lên và lưu vào bảng Posts
        [HttpPost]
        public IActionResult Create(Post model)
        {
            // Tự động gán ngày tạo hiện tại của hệ thống cho bài viết mới
            model.CreatedDate = DateTime.Now;

            // Xử lý ảnh mặc định nếu người dùng không nhập link ảnh mẫu
            if (string.IsNullOrEmpty(model.ImageUrl))
            {
                model.ImageUrl = "/img/default.jpg";
            }

            // Dùng LINQ thêm mới bài viết vào hàng đợi của EF Core
            _context.Posts.Add(model);
            _context.SaveChanges(); // Lưu thay đổi xuống SQL Server

            return RedirectToAction("Index");
        }

        // ===================================================================
        // CHỨC NĂNG 2: CHỈNH SỬA BÀI VIẾT (EDIT)
        // ===================================================================

        // Hàm GET: Lấy thông tin bài viết cũ dựa vào Id và nạp danh sách chuyên mục
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var post = _context.Posts.FirstOrDefault(p => p.Id == id);
            if (post == null)
            {
                return NotFound();
            }

            // Nạp lại danh sách Categories để form sửa hiển thị tùy chọn danh mục
            ViewBag.Categories = _context.Categories.ToList();
            return View(post);
        }

        // Hàm POST: Nhận thông tin chỉnh sửa mới từ Form và cập nhật an toàn bằng LINQ
        [HttpPost]
        public IActionResult Edit(Post model)
        {
            // Dùng LINQ tìm bài viết gốc hiện tại trong cơ sở dữ liệu dựa trên Id
            var existingPost = _context.Posts.FirstOrDefault(p => p.Id == model.Id);

            if (existingPost == null)
            {
                return NotFound();
            }

            // Tiến hành cập nhật từng trường thông tin thay đổi từ giao diện form truyền vào
            existingPost.Title = model.Title;
            existingPost.Content = model.Content;
            existingPost.CategoryId = model.CategoryId; // Cập nhật chuyên mục mới chọn
            existingPost.ImageUrl = !string.IsNullOrEmpty(model.ImageUrl) ? model.ImageUrl : "/img/default.jpg";

            // Tuyệt đối giữ nguyên ngày tạo gốc (existingPost.CreatedDate) không thay đổi khi sửa bài viết

            // Thực thi câu lệnh kết xuất cập nhật an toàn xuống Database
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        // ===================================================================
        // CHỨC NĂNG 3: XÓA BÀI VIẾT (DELETE)
        // ===================================================================

        // Hàm GET: Tìm kiếm bài viết theo Id để hiển thị giao diện xác nhận trước khi xóa hẳn
        [HttpGet]
        public IActionResult Delete(int id)
        {
            // Dùng LINQ kết hợp Include nạp kèm thông tin danh mục của bài viết chuẩn bị xóa
            var post = _context.Posts.Include(p => p.Category).FirstOrDefault(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            return View(post);
        }

        // Hàm POST: Thực thi lệnh xóa bản ghi khi người dùng click xác nhận trên giao diện
        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirmed(int id)
        {
            // Dùng LINQ tìm lại bản ghi để chắc chắn thực thể tồn tại trước khi xóa
            var post = _context.Posts.FirstOrDefault(p => p.Id == id);

            if (post != null)
            {
                // Đánh dấu xóa đối tượng khỏi bộ nhớ tạm
                _context.Posts.Remove(post);
                _context.SaveChanges(); // Gửi lệnh SQL DELETE xuống Database
            }

            return RedirectToAction("Index");
        }
    }
}