import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import BlogSidebar from './BlogSidebar'; // Import sidebar n?u b?n mu?n hi?n th? bài vi?t liên quan
import Footer from '../../components/Footer'; // Cân ch?nh l?i ???ng d?n cho ?úng c?u trúc c?a b?n

function BlogDetail() {
    const { id } = useParams(); // L?y ID bài vi?t t? URL (ví d?: /blog/7)
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // G?i API Backend C# l?y chi ti?t bài vi?t theo ID
        axios.get(`https://localhost:7195/api/posts/${id}`)
            .then(res => {
                setPost(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("L?i l?y chi ti?t bài vi?t:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">?ang t?i bài vi?t...</span>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container text-center py-5">
                <h3 className="text-muted">?? Không tìm th?y bài vi?t yêu c?u ho?c ?ã b? xóa</h3>
                <Link to="/" className="btn btn-primary mt-3 fw-bold px-4 py-2" style={{ borderRadius: '8px' }}>
                    Quay v? Trang Ch?
                </Link>
            </div>
        );
    }

    // ??nh d?ng hi?n th? ngày ??ng (Ví d?: 04/04/2026)
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    return (
        <div className="blog-detail-container" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            {/* Breadcrumb thanh ?i?u h??ng nhanh */}
            <div className="bg-white border-bottom py-3 mb-4">
                <div className="container text-start">
                    <small className="text-muted">
                        <Link to="/" className="text-decoration-none text-secondary">Trang ch?</Link> /
                        <span className="text-secondary ms-1">Tin t?c</span> /
                        <span className="text-dark ms-1 fw-bold">{post.title}</span>
                    </small>
                </div>
            </div>

            {/* Kh?i n?i dung chính */}
            <div className="container mb-5">
                <div className="row g-4">
                    {/* C?t bên trái: N?i dung chi ti?t bài vi?t */}
                    <div className="col-lg-8 text-start">
                        <div className="bg-white p-4 p-md-5 shadow-sm border" style={{ borderRadius: '16px' }}>

                            {/* Chuyên m?c & Ngày ??ng */}
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <span className="badge bg-danger px-3 py-2 text-uppercase fw-bold" style={{ borderRadius: '6px' }}>
                                    {post.categoryPost?.name || "Công Ngh?"}
                                </span>
                                <small className="text-muted">?? ??ng ngày: {formatDate(post.createdDate || post.dateCreated)}</small>
                            </div>

                            {/* Tiêu ?? bài vi?t */}
                            <h1 className="fw-bold text-dark mb-4" style={{ lineHeight: '1.4', fontSize: '2.2rem' }}>
                                {post.title}
                            </h1>

                            {/* Tóm t?t n?i dung ng?n */}
                            {post.summary && (
                                <div className="p-3 bg-light rounded-3 mb-4 border-start border-danger border-4 italic" style={{ fontStyle: 'italic', color: '#555' }}>
                                    {post.summary}
                                </div>
                            )}

                            {/* Hình ?nh ??i di?n bài vi?t */}
                            {post.imageUrl && (
                                <div className="text-center mb-4 rounded-3 overflow-hidden shadow-sm">
                                    <img
                                        src={post.imageUrl.startsWith('http') ? post.imageUrl : `https://localhost:7195${post.imageUrl}`}
                                        alt={post.title}
                                        className="img-fluid w-100"
                                        style={{ maxHeight: '450px', objectFit: 'cover' }}
                                    />
                                </div>
                            )}

                            {/* N?i dung chi ti?t chính */}
                            <div
                                className="blog-content mt-4"
                                style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#333' }}
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>
                    </div>

                    {/* C?t bên ph?i: Sidebar bài vi?t liên quan */}
                    <div className="col-lg-4 text-start">
                        <BlogSidebar currentPostId={post.id} />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default BlogDetail;