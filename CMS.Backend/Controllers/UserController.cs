using Microsoft.AspNetCore.Mvc;
using CMS.Data; // 1. THÊM DÒNG NÀY: Để nhận diện lớp ApplicationDbContext
using CMS.Data.Entities; // Cần thiết để nhận diện thực thể User
using System.Linq; // 2. THÊM DÒNG NÀY: Để sử dụng hàm .ToList() của LINQ

namespace CMS.Backend.Controllers
{
    public class UserController : Controller
    {
        // 3. Khai báo biến ngữ cảnh cơ sở dữ liệu (readonly)
        private readonly ApplicationDbContext _context;

        // 4. Sử dụng Constructor Injection để tiêm DbContext vào Controller
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Hàm Index: Hiển thị danh sách thành viên thực tế từ SQL Server
        public IActionResult Index()
        {
            // 5. Thay thế Mock Data bằng lệnh gọi dữ liệu thật từ bảng Users
            var users = _context.Users.ToList();

            // 6. Trả về View kèm theo danh sách người dùng thật
            return View(users);
        }

        // ==================== CHỨC NĂNG 1: THÊM MỚI USER (CREATE) ====================

        // Hàm GET: Mở Form trống cho người dùng nhập liệu thông tin tài khoản mới
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // Hàm POST: Đón nhận dữ liệu từ Form gửi lên và lưu vào bảng Users trong SQL Server
        [HttpPost]
        public IActionResult Create(User model)
        {
            // Kiểm tra nếu người dùng không điền mật khẩu ngoài Form, tự động gán mặc định để tránh lỗi NULL dữ liệu
            if (string.IsNullOrEmpty(model.PasswordHash))
            {
                model.PasswordHash = "123456";
            }

            // Bước 1: Thêm đối tượng model vào bộ nhớ tạm (Hàng đợi của EF Core)
            _context.Users.Add(model);

            // Bước 2: Chốt đơn - Ghi nhận dữ liệu thực tế xuống cơ sở dữ liệu SQL Server
            _context.SaveChanges();

            // Quay về lại trang danh sách sau khi hoàn tất hành động thêm mới
            return RedirectToAction("Index");
        }

        // ==================== CHỨC NĂNG 2: SỬA THÔNG TIN USER (EDIT) ====================

        // Hàm GET: Tìm kiếm tài khoản dựa theo Id và đổ dữ liệu cũ lên các ô nhập liệu
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
            {
                return NotFound(); // Trả về lỗi 404 nếu không tìm thấy User
            }

            return View(user);
        }

        // Hàm POST: Đón nhận thông tin chỉnh sửa mới từ Form và cập nhật vào SQL Server
        [HttpPost]
        public IActionResult Edit(User model)
        {
            // Tìm bản ghi gốc đang lưu trữ thực tế trong cơ sở dữ liệu dựa trên Id
            var existingUser = _context.Users.FirstOrDefault(u => u.Id == model.Id);

            if (existingUser == null)
            {
                return NotFound();
            }

            // Cập nhật các trường thông tin thay đổi từ giao diện form truyền vào
            existingUser.FullName = model.FullName;
            existingUser.Role = model.Role;

            // XỬ LÝ AN TOÀN CHO MẬT KHẨU: 
            // Nếu người dùng nhập mật khẩu mới trên form -> Cập nhật mật khẩu mới.
            // Nếu người dùng để trống -> Giữ nguyên mật khẩu cũ trong database (Tránh lỗi đè giá trị NULL).
            if (!string.IsNullOrEmpty(model.PasswordHash))
            {
                existingUser.PasswordHash = model.PasswordHash;
            }

            // Chốt đơn - Thực thi câu lệnh kết xuất cập nhật an toàn xuống Database thay vì dùng .Update(model) bừa bãi
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        // ==================== CHỨC NĂNG 3: XÓA USER (DELETE) ====================

        // Hàm GET: Tìm kiếm User theo Id để hiển thị giao diện xác nhận trước khi xóa hẳn
        [HttpGet]
        public IActionResult Delete(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // Hàm POST: Thực thi xóa bản ghi khi người dùng click xác nhận "Xóa" trên giao diện
        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirmed(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);

            if (user != null)
            {
                // Bước 1: Đánh dấu bản ghi này sẽ bị xóa khỏi bộ nhớ tạm
                _context.Users.Remove(user);

                // Bước 2: Chốt đơn - Thực thi câu lệnh SQL DELETE để xóa hẳn khỏi Database
                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }
    }
}