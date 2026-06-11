using CMS.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // 5. Hàm khởi tạo (Constructor): "Tiêm" kết nối Database vào để sử dụng
        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            // Lấy dữ liệu từ bảng Customers
            var posts = _context.Customers
                .OrderByDescending(p => p.Id) // Sắp xếp bài mới nhất lên đầu
                .Select(p => new {            // "Gọt tỉa" dữ liệu: chỉ lấy những trường cần thiết
                    p.Id,
                    p.FullName,
                    p.Email,
                    p.Phone,
                    p.Address,
                    p.Password,
                })
                .ToList();

            // Trả về kết quả cho Frontend kèm mã trạng thái 200 (Thành công)
            return Ok(posts);
        }
        [HttpGet("{id}")]
        public IActionResult GetDetail(int id)
        {
            // 2. Tìm bài viết đầu tiên có Id khớp với tham số truyền vào
            var post = _context.Posts
                .FirstOrDefault(p => p.Id == id);

            // 3. Xử lý trường hợp không tìm thấy (ID không tồn tại)
            if (post == null)
            {
                // Trả về lỗi 404 kèm thông báo dưới dạng JSON
                return NotFound(new { message = "Không tìm thấy bài viết này trong hệ thống" });
            }

            // 4. Trả về bài viết tìm thấy kèm mã 200 (Thành công)
            return Ok(post);
        }
    }
}
