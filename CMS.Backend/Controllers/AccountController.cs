using CMS.Data; // Thay bằng Namespace của project Data
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;
using System.Security.Claims;

public class AccountController : Controller
{
    private readonly ApplicationDbContext _context;

    public AccountController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }
    [ApiController]
    [Route("api/[controller]")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
        {
            return BadRequest(new { Message = "Vui lòng điền đầy đủ thông tin!" });
        }

        // Cắt bỏ khoảng trắng thừa nếu có bằng .Trim()
        string loginUser = request.Username.Trim();
        string loginPass = request.Password.Trim();

        // 1. Tìm tài khoản (Dùng ToLower() để không phân biệt chữ hoa chữ thường)
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.TaiKhoan.ToLower() == loginUser.ToLower());

        if (user == null)
        {
            return BadRequest(new { Message = "Không tìm thấy tài khoản này trong hệ thống!" });
        }

        // 2. Ép kiểu mật khẩu về chuỗi chuẩn để so sánh (Đề phòng trường hợp cột mật khẩu trong DB mang kiểu dữ liệu khác)
        string dbPassword = user.MatKhau?.ToString().Trim() ?? "";

        if (dbPassword != loginPass)
        {
            return BadRequest(new { Message = "Mật khẩu nhập vào không chính xác!" });
        }

        // 3. Đúng thông tin -> Trả về JSON thành công
        return Ok(new
        {
            Token = "MOCK-JWT-TOKEN-SUCCESS",
            User = new
            {
                Id = user.Id,
                Username = user.TaiKhoan,
                FullName = user.HoTen ?? "Thành viên",
                Role = user.Quyen ?? "USER"
            }
        });
    }

    [HttpGet]
    public IActionResult AccessDenied()
    {
        return View();
    }

    // Hàm đăng xuất
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return RedirectToAction("Login");
    }
}