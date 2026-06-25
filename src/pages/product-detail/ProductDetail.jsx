import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductInfo from './ProductInfo';
import Footer from '../../components/Footer';

function ProductDetail() {
    const { id } = useParams(); // L?y ID t? URL c?a Router
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // G?i API chi ti?t s?n ph?m theo ID t? c?ng 7195
        axios.get(`https://localhost:7195/api/products/${id}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("L?i l?y chi ti?t s?n ph?m:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">?ang t?i...</span>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container text-center py-5">
                <h3 className="text-muted">?? Không tìm th?y s?n ph?m yêu c?u</h3>
                <Link to="/" className="btn btn-primary mt-3fw-bold px-4 py-2" style={{ borderRadius: '8px' }}>
                    Quay v? Trang Ch?
                </Link>
            </div>
        );
    }

    return (
        <div className="product-detail-container" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            {/* Thanh ?i?u h??ng nhanh (Breadcrumb) */}
            <div className="bg-white border-bottom py-3 mb-4">
                <div className="container text-start">
                    <small className="text-muted">
                        <Link to="/" className="text-decoration-none text-secondary">Trang ch?</Link> /
                        <span className="text-dark ms-1 fw-bold">{product.name}</span>
                    </small>
                </div>
            </div>

            {/* Kh?i hi?n th? thông tin chi ti?t */}
            <div className="container mb-5">
                <ProductInfo product={product} />
            </div>

            <Footer />
        </div>
    );
}

export default ProductDetail;