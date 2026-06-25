import React from 'react';


const IMAGE_BASE_URL = "https://localhost:7111"; // ???ng d?n bên Backend
//  component con nh?n d? li?u 'post' t?  component cha truy?n xu?ng
function PostCard({ post }) {
    return (
        <div className="card h-100 shadow-sm border-0 blog-card-hover" style={{ borderRadius: '12px', overflow: 'hidden', transition: '0.3s' }}>


            {/* 1. Hình ?nh ??i di?n c?a bài vi?t (Thumbnail) */}
            <div className="blog-image-wrapper" style={{ height: '220px', overflow: 'hidden' }}>
                <img
                    //src={post.imageUrl || 'https://via.placeholder.com/400x250'}
                    src={IMAGE_BASE_URL + post.imageUrl}
                    className="w-100 h-100"
                    alt={post.title}
                    style={{ objectFit: 'cover', transition: '0.5s' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.08)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
            </div>




            {/* 2. N?i dung tóm t?t bài vi?t */}
            <div className="card-body p-4 d-flex flex-column">
                {/* Ngày ??ng bài vi?t */}
                <small className="text-uppercase font-weight-bold text-muted mb-2 d-block" style={{ fontSize: '12px', color: '#11CAA0' }}>
                    <i className="far fa-calendar-alt mr-1"></i>
                    {post.createdDate ? new Date(post.createdDate).toLocaleDateString('vi-VN') : 'M?i c?p nh?t'}
                </small>




                {/* Tiêu ?? bài vi?t - Gi?i h?n t?i ?a 2 dòng ?? không b? l?ch phom */}
                <h5 className="card-title font-weight-bold mb-2" style={{ color: '#005088', fontSize: '18px', lineHeight: '1.4', minHeight: '50px' }}>
                    <a href={`/blog/${post.id}`} className="text-decoration-none text-dark-hover" style={{ color: '#005088' }}>
                        {post.title}
                    </a>
                </h5>




                {/* ?o?n mô t? ng?n (C?t chu?i an toàn b?o v? layout) */}
                <p className="card-text text-secondary text-justify mb-4" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                    {post.summary ? `${post.summary.substring(0, 100)}...` : 'Khám phá bí quy?t l?a ch?n trang ph?c phù h?p v?i vóc dáng ?? luôn t? tin t?a sáng...'}
                </p>




                {/* Nút liên k?t xem chi ti?t ??y xu?ng sát ?áy Card */}
                <div className="mt-auto pt-2 border-top">
                    <a
                        href={`/blog/${post.id}`}
                        className="font-weight-bold text-decoration-none d-inline-flex align-items-center"
                        style={{ color: '#11CAA0', fontSize: '14px', transition: '0.3s' }}
                        onMouseOver={(e) => e.target.style.color = '#005088'}
                        onMouseOut={(e) => e.target.style.color = '#11CAA0'}
                    >
                        ??c bài vi?t <i className="fas fa-long-arrow-alt-right ml-2"></i>
                    </a>
                </div>
            </div>




        </div>
    );
}




export default PostCard;
