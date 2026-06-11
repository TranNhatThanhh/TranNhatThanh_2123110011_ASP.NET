using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // 5. Hàm khởi tạo (Constructor): "Tiêm" kết nối Database vào để sử dụng
        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            // Lấy dữ liệu từ bảng Orders
            var posts = _context.Orders
                .OrderByDescending(p => p.Id) // Sắp xếp bài mới nhất lên đầu
                .Select(p => new {            // "Gọt tỉa" dữ liệu: chỉ lấy những trường cần thiết
                    p.Id,
                    p.OrderDate,
                    p.CustomerId,
                    p.Status,
                    p.Notes,
                    Customer = p.Customer.Id,
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
        [HttpPost]
        public IActionResult CreateOrder([FromBody] Order orderInput)
        {
            // Kiểm tra dữ liệu đầu vào cơ bản
            if (orderInput == null)
            {
                return BadRequest(new { message = "Dữ liệu gửi lên không hợp lệ" });
            }

            try
            {
                // Gán ngày tạo mặc định nếu frontend không gửi
                if (orderInput.OrderDate == DateTime.MinValue || orderInput.OrderDate == null)
                {
                    orderInput.OrderDate = DateTime.Now;
                }

                // Trạng thái mặc định khi vừa tạo đơn (ví dụ: 0 hoặc tùy logic của bạn)
                // orderInput.Status = 0; 

                // Thêm đơn hàng vào DbContext
                _context.Orders.Add(orderInput);

                // Lưu thay đổi thực sự xuống Database
                _context.SaveChanges();

                // Trả về mã 201 Created cùng dữ liệu đơn hàng vừa tạo thành công
                return CreatedAtAction(nameof(GetDetail), new { id = orderInput.Id }, orderInput);
            }
            catch (Exception ex)
            {
                // Trả về lỗi 500 nếu có sự cố lưu db (sai khóa ngoại, thiếu trường bắt buộc...)
                return StatusCode(500, new { message = "Có lỗi xảy ra khi tạo đơn hàng", error = ex.Message });
            }
        }
    }
}
