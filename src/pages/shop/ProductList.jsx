import React from 'react';
import { Link } from 'react-router-dom';

function ProductList({ products }) {
    return (
        <div className="d-flex flex-column gap-3 text-start">
            {products.map(product => {
                const imgUrl = product.imageUrl?.startsWith('http') ? product.imageUrl : `https://localhost:7195${product.imageUrl}`;
                return (
                    <div key={product.id} className="card shadow-sm border rounded-3 overflow-hidden">
                        <div className="row g-0 align-items-center">
                            <div className="col-md-3 text-center p-3">
                                <img src={imgUrl} alt={product.name} className="img-fluid rounded" style={{ maxHeight: '160px', objectFit: 'contain' }} />
                            </div>
                            <div className="col-md-6 p-3">
                                <h5 className="fw-bold text-dark mb-2">{product.name}</h5>
                                <p className="text-muted small mb-2">{product.description}</p>
                                <h5 className="text-danger fw-bold">{product.price?.toLocaleString('vi-VN')} đ</h5>
                            </div>
                            <div className="col-md-3 p-3 text-center border-start">
                                <Link to={`/product/${product.id}`} className="btn btn-primary btn-sm w-100 fw-bold mb-2">Xem chi tiết</Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ProductList;