import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductGrid({ activeCategoryId = 'all', searchQuery = '' }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get("https://localhost:7195/api/products")
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi lấy danh sách sản phẩm:", err);
                setLoading(false);
            });
    }, []);

    const formatCurrency = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    // Xử lý bộ lọc sản phẩm an toàn
    const filteredProducts = products.filter(product => {
        // Hỗ trợ cả trường hợp component cha truyền null, undefined hoặc chuỗi 'all'
        const matchesCategory = activeCategoryId === null ||
            activeCategoryId === undefined ||
            activeCategoryId === 'all' ||
            product.categoryProductId === activeCategoryId;

        // Khắc phục triệt để mọi tình huống liên quan đến toLowerCase()
        const productName = (product.name || '').toLowerCase();
        const safeSearchQuery = (searchQuery || '').toLowerCase();
        const matchesSearch = productName.includes(safeSearchQuery);

        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <div className="text-center mt-5 py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Đang tải sản phẩm...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4 mb-5">
            <div className="text-start mb-4 border-bottom pb-2">
                <h4 className="text-dark text-uppercase m-0 fw-bold" style={{ fontSize: '1.4rem' }}>
                    {searchQuery ? `🔍 Kết quả tìm kiếm cho: "${searchQuery}"` : "🔥 Khám Phá Toàn Bộ Gear"}
                </h4>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="text-center py-5 border rounded bg-white shadow-sm my-4">
                    <p className="text-muted m-0 fw-bold">⚠️ Không tìm thấy phụ kiện máy tính nào phù hợp với bộ lọc.</p>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
                    {filteredProducts.map((item) => {
                        // Cấu hình link ảnh chuẩn xác nhận diện từ API Backend
                        const imgUrl = item.imageUrl?.startsWith('http')
                            ? item.imageUrl
                            : `https://localhost:7195${item.imageUrl || '/uploads/default.jpg'}`;

                        return (
                            <div className="col" key={item.id}>
                                <div className="card h-100 border-0 shadow-sm p-3 position-relative overflow-hidden" style={{ borderRadius: '12px', backgroundColor: '#fff' }}>
                                    {/* Khối ảnh sản phẩm */}
                                    <div className="d-flex align-items-center justify-content-center bg-white" style={{ height: '160px' }}>
                                        <img
                                            src={imgUrl}
                                            className="img-fluid"
                                            alt={item.name || "Sản phẩm"}
                                            style={{ maxHeight: '150px', objectFit: 'contain' }}
                                        />
                                    </div>

                                    {/* Khối nội dung */}
                                    <div className="card-body px-1 pt-3 pb-0 text-start d-flex flex-column justify-content-between">
                                        <div>
                                            <span className="badge bg-light text-secondary border mb-2 text-uppercase" style={{ fontSize: '0.75rem' }}>
                                                {item.categoryProduct?.name || "Gear"}
                                            </span>
                                            <h6 className="fw-bold text-dark text-truncate-2 mb-2" style={{ minHeight: '40px', lineHeight: '1.4' }}>
                                                {item.name || "Sản phẩm chưa cập nhật tên"}
                                            </h6>
                                            <p className="text-danger fw-bold m-0 fs-5">{formatCurrency(item.price || 0)}</p>
                                        </div>

                                        <Link to={`/product/${item.id}`} className="btn btn-outline-primary btn-sm w-100 mt-3 fw-bold py-2" style={{ borderRadius: '8px' }}>
                                            Xem Chi Tiết
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ProductGrid;