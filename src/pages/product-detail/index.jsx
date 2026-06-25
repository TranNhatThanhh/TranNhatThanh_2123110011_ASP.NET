import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductInfo from './ProductInfo';
import Footer from '../../components/Footer'; // Điều chỉnh đường dẫn tùy theo cấu trúc thư mục của bạn

function ProductDetail() {
    const { id } = useParams(); // Lấy ID sản phẩm từ URL (ví dụ: /product/15)
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Gọi API lấy chi tiết 1 sản phẩm theo ID từ cổng 7195
        axios.get(`https://localhost:7195/api/products/${id}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi lấy chi tiết sản phẩm:", err);
                setLoading(false);
            });
    }, [id]);

    // Trạng thái đang tải dữ liệu
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </div>
            </div>
        );
    }

    // Trạng thái không tìm thấy sản phẩm trong Database
    if (!product) {
        return (
            <div className="container text-center py-5">
                <h3 className="text-muted">⚠️ Không tìm thấy sản phẩm yêu cầu</h3>
                <Link to="/" className="btn btn-primary mt-3 fw-bold px-4 py-2" style={{ borderRadius: '8px' }}>
                    Quay về Trang Chủ
                </Link>
            </div>
        );
    }

    return (
        <div className="product-detail-container" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            {/* Thanh điều hướng nhanh (Breadcrumb) */}
            <div className="bg-white border-bottom py-3 mb-4">
                <div className="container text-start">
                    <small className="text-muted">
                        <Link to="/" className="text-decoration-none text-secondary">Trang chủ</Link> /
                        <span className="text-dark ms-1 fw-bold">{product.name}</span>
                    </small>
                </div>
            </div>

            {/* Khối hiển thị thông tin chi tiết */}
            <div className="container mb-5">
                <ProductInfo product={product} />
            </div>

            <Footer />
        </div>
    );
}

export default ProductDetail;