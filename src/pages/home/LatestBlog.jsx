import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LatestBlog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Gọi API lấy danh sách bài viết từ cổng 7195 của bạn
        axios.get("https://localhost:7195/api/posts") // Đổi endpoint này nếu route C# của bạn tên khác (ví dụ api/blogs, api/articles)
            .then(res => {
                // Thường trang chủ chỉ hiển thị 3 bài viết mới nhất
                if (res.data) {
                    setBlogs(res.data.slice(0, 3));
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi lấy danh sách bài viết từ Database:", err);
                setLoading(false);
            });
    }, []);

    // Hàm định dạng ngày tháng hiển thị thân thiện (nếu database trả về chuỗi ISO dạng 2026-04-04...)
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    if (loading) {
        return <div className="text-center my-4"><div className="spinner-border spinner-border-sm text-secondary" role="status"></div></div>;
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="text-start mb-4">
                <h4 className="font-weight-bold text-dark text-uppercase m-0 fw-bold">GÓC CÔNG NGHỆ & REVIEW</h4>
                <small className="text-muted">Cập nhật xu hướng Gear mới nhất và bí kíp chọn phụ kiện chuẩn chỉ</small>
            </div>

            {blogs.length === 0 ? (
                <div className="text-center py-4 text-muted">Chưa có bài viết nào được đăng tải.</div>
            ) : (
                <div className="row">
                    {blogs.map((blog) => (
                        <div className="col-md-4 mb-4" key={blog.id}>
                            <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                                <img
                                    // Kiểm tra nếu url ảnh từ DB là đường dẫn tuyệt đối hay tương đối giống phần sản phẩm
                                    src={blog.imageUrl?.startsWith('http') ? blog.imageUrl : `https://localhost:7195${blog.imageUrl}`}
                                    className="card-img-top"
                                    alt={blog.title}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body text-start">
                                    <small className="text-primary fw-bold d-block mb-2">
                                        📅 {formatDate(blog.createdDate || blog.date)}
                                    </small>
                                    <h5 className="card-title font-weight-bold text-dark text-truncate mb-2" style={{ height: '44px', overflow: 'hidden' }}>
                                        {blog.title}
                                    </h5>
                                    <p className="card-text text-muted small" style={{ height: '60px', overflow: 'hidden' }}>
                                        {blog.summary || blog.content?.replace(/<[^>]*>/g, '').slice(0, 100) + '...'}
                                    </p>
                                    <a href={`/blog/${blog.id}`} className="btn btn-link text-primary p-0 fw-bold text-decoration-none">
                                        Đọc thêm →
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LatestBlog;