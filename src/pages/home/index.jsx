import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import HeroBanner from './HeroBanner';
import CategoryMenu from './CategoryMenu';
import ProductGrid from './ProductGrid';
import LatestBlog from './LatestBlog';
import Footer from '../../components/Footer';

function Home() {
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const [newProducts, setNewProducts] = useState([]);
    const [hotProducts, setHotProducts] = useState([]);

    useEffect(() => {
        // Gọi API chính xác theo cổng 7195 và route api/products
        axios.get("https://localhost:7195/api/products")
            .then(res => {
                // Lấy tạm 3 phần tử đầu làm hàng mới, 3 phần tử sau làm hàng hot
                setNewProducts(res.data.slice(0, 3));
                setHotProducts(res.data.slice(2, 5));
            })
            .catch(err => console.error("Lỗi lấy sản phẩm:", err));
    }, []);

    const formatCurrency = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    const renderProductCards = (productsList) => (
        <div className="row">
            {productsList.map((item) => (
                <div className="col-md-4 col-sm-6 col-12 mb-4" key={item.id}>
                    <div className="card h-100 border-0 shadow-sm p-3" style={{ borderRadius: '12px' }}>
                        <img
                            src={item.imageUrl?.startsWith('http') ? item.imageUrl : `https://localhost:7195${item.imageUrl}`}
                            className="card-img-top mx-auto"
                            alt={item.name}
                            style={{ height: '180px', objectFit: 'contain', width: '100%' }}
                        />
                        <div className="card-body px-1 py-3 text-start">
                            <h6 className="font-weight-bold text-dark text-truncate mb-1">{item.name}</h6>
                            <p className="text-danger font-weight-bold m-0">{formatCurrency(item.price || 0)}</p>
                            <Link to={`/product/${item.id}`} className="btn btn-primary btn-sm w-100 mt-2 fw-bold" style={{ borderRadius: '8px' }}>
                                Xem Chi Tiết
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="homepage-container" style={{ backgroundColor: '#f8f9fa' }}>
            <HeroBanner />

            <div className="container mt-5">
                <div className="text-start mb-4">
                    <h4 className="font-weight-bold text-primary text-uppercase m-0">LINH KIỆN & PHỤ KIỆN MỚI VỀ</h4>
                    <small className="text-muted">Top 3 sản phẩm Gear mới nhất tuần này</small>
                </div>
                {renderProductCards(newProducts)}
            </div>

            <div className="container mt-5">
                <div className="text-start mb-4">
                    <h4 className="font-weight-bold text-danger text-uppercase m-0">SẢN PHẨM BÁN CHẠY NHẤT</h4>
                    <small className="text-muted">Bộ sưu tập phụ kiện máy tính được săn đón nhiều nhất</small>
                </div>
                {renderProductCards(hotProducts)}
            </div>

            <CategoryMenu activeCategoryId={activeCategoryId} onSelectCategory={setActiveCategoryId} />
            <ProductGrid activeCategoryId={activeCategoryId} searchQuery={searchQuery} />
            <LatestBlog />
            <Footer />
        </div>
    );
}

export default Home;