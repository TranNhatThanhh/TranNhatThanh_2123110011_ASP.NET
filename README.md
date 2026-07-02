# 📘 ĐỒ ÁN CHUYÊN ĐỀ: ASP.NET CORE + REACTJS
**Hệ thống E-Commerce Đồ Công Nghệ & Gaming Gear (CMS) - ThanhCMS GEAR**

---

## 👤 THÔNG TIN SINH VIÊN THỰC HIỆN
- **Họ và tên:** Trần Nhật Thanh
- **Mã số sinh viên (MSSV):** 2123110011
- **Lớp:** CCQ2311A
- **Năm thực hiện:** 2026

---


# 📖 1. Giới thiệu đề tài

## 1.1 Giới thiệu

ThanhCMS GEAR là hệ thống thương mại điện tử chuyên kinh doanh các sản phẩm công nghệ và Gaming Gear như:

- Bàn phím cơ
- Chuột Gaming
- Tai nghe Gaming
- Ghế Gaming
- Màn hình
- Laptop
- PC Gaming
- Linh kiện máy tính
- Phụ kiện công nghệ

Hệ thống được xây dựng theo mô hình Client - Server với:

- Frontend: ReactJS
- Backend: ASP.NET Core MVC + Web API
- Database: SQL Server

Website giúp khách hàng dễ dàng tìm kiếm, mua sắm và thanh toán trực tuyến. Đồng thời cung cấp hệ thống quản trị giúp quản lý sản phẩm, danh mục, đơn hàng, khách hàng và bài viết.

---

# 🎯 2. Mục tiêu đề tài

## Mục tiêu chính

- Xây dựng website bán hàng hiện đại.
- Áp dụng kiến thức ASP.NET Core và ReactJS.
- Xây dựng RESTful API.
- Thiết kế cơ sở dữ liệu chuẩn.
- Tích hợp xác thực người dùng.
- Quản lý đơn hàng trực tuyến.
- Quản trị nội dung website.

---

# ⚙️ 3. Công nghệ sử dụng

| Công nghệ | Mô tả |
|------------|----------------------|
| ASP.NET Core 8 | Backend |
| Entity Framework Core | ORM |
| SQL Server | Database |
| ReactJS | Frontend |
| Axios | Gọi API |
| Bootstrap 5 | Giao diện |
| JWT Authentication | Đăng nhập |
| Swagger | Test API |
| Visual Studio 2022 | Backend IDE |
| Visual Studio Code | Frontend IDE |
| Git & GitHub | Quản lý source |

---

# 🏗️ 4. Kiến trúc hệ thống

```
ReactJS
      │
      │ Axios
      ▼
ASP.NET Core Web API
      │
Entity Framework Core
      │
SQL Server
```

---

# 🗂️ 5. Chức năng hệ thống

## 👤 Khách hàng

- Đăng ký
- Đăng nhập
- Đăng xuất
- Quên mật khẩu
- Xem sản phẩm
- Xem chi tiết sản phẩm
- Tìm kiếm
- Lọc theo danh mục
- Thêm vào giỏ hàng
- Thanh toán
- Xem lịch sử đơn hàng
- Cập nhật thông tin cá nhân

---

## 🛠️ Quản trị viên

### Dashboard

- Thống kê doanh thu
- Thống kê đơn hàng
- Thống kê khách hàng
- Thống kê sản phẩm

### Quản lý

- Danh mục sản phẩm
- Sản phẩm
- Khách hàng
- Đơn hàng
- Bài viết
- Danh mục bài viết
- Banner
- Slider
- Menu
- Liên hệ
- Tài khoản Admin

---

# 🗃️ 6. Cơ sở dữ liệu

Các bảng chính:

- Users
- Roles
- Products
- ProductImages
- Categories
- Orders
- OrderDetails
- Customers
- Posts
- PostCategories
- Menus
- Banners
- Contacts

---


# 🚀 8. Hướng dẫn cài đặt

## Clone project

```bash
https://github.com/TranNhatThanhh/TranNhatThanh_2123110011_ASP.NET
```

---

## Backend

```bash
cd Backend

dotnet restore

dotnet ef database update

dotnet run
```

---

## Frontend

```bash
cd Frontend

npm install

npm start
```

---

## SQL Server

Cập nhật chuỗi kết nối trong

```
appsettings.json
```

Ví dụ:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=.;Database=TranNhatThanhCMS_DB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

---

# 🔑 Tài khoản mặc định

## Admin

```
Email:
admin@gmail.com

Password:
123456
```

---

# 📌 Các tính năng nổi bật

- Responsive trên mọi thiết bị
- JWT Authentication
- RESTful API
- CRUD đầy đủ
- Upload hình ảnh
- Phân quyền Admin/User
- Dashboard thống kê
- Quản lý đơn hàng
- Quản lý bài viết
- Quản lý banner
- Quản lý menu
- Tìm kiếm sản phẩm
- Giỏ hàng
- Thanh toán

---

# 📚 Kiến thức áp dụng

- ASP.NET Core MVC
- ASP.NET Core Web API
- Entity Framework Core
- LINQ
- SQL Server
- ReactJS
- React Router
- Axios
- Bootstrap
- JWT Authentication
- Git & GitHub

---

# Hướng dẫn chạy Trang web

1. Mở file `ThanhCMS_Solution.sln` bằng Visual Studio.
2. Đảm bảo cấu hình ConnectionString trong file `appsettings.json` đã trỏ đúng vào SQL Server.
3. Khôi phục packages và tạo Database từ Migrations:
```bash
cd CMS.Backend
dotnet restore
dotnet ef database update
```
4. Khởi chạy server Backend (Nhấn phím **F5** hoặc dùng lệnh sau, mặc định: `https://localhost:7195`)
```bash
dotnet run
```

### 🔹 10.3. Cấu hình Frontend (ReactJS)
```bash
cd cms.frontend
# Cài đặt thư viện Node_Modules
npm install
# Khởi chạy cổng UI Client
npm start
```
Hệ thống sẽ mở tab trình duyệt tại `http://localhost:3000`.

---

# 👨‍💻 Tác giả

**Trần Nhật Thanh**

Sinh viên ngành Công nghệ Thông tin

Trường Cao Đẳng Công Thương TPHCM

---

# ⭐ Kết luận

Đề tài **ThanhCMS GEAR** là hệ thống thương mại điện tử được xây dựng bằng **ASP.NET Core** kết hợp **ReactJS**, đáp ứng đầy đủ các chức năng của một website bán hàng hiện đại. Hệ thống giúp khách hàng mua sắm thuận tiện và hỗ trợ quản trị viên quản lý hiệu quả sản phẩm, đơn hàng và nội dung website. Đây là dự án giúp vận dụng kiến thức về lập trình Web, Web API, ReactJS, cơ sở dữ liệu SQL Server và phát triển phần mềm theo mô hình Client–Server.