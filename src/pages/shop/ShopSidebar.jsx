import React from 'react';

function ShopSidebar({ minPrice, setMinPrice, maxPrice, setMaxPrice }) {
    return (
        <div className="bg-white p-3 shadow-sm border rounded-3 text-start">
            <h5 className="fw-bold mb-3 pb-2 border-bottom text-danger">💰 BỘ LỌC GIÁ BÁN</h5>
            <div className="mb-3">
                <label className="form-label small text-muted">Giá tối thiểu (VNĐ)</label>
                <input
                    type="number"
                    className="form-control form-control-sm"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                />
            </div>
            <div className="mb-3">
                <label className="form-label small text-muted">Giá tối đa (VNĐ)</label>
                <input
                    type="number"
                    className="form-control form-control-sm"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
            </div>
            <button
                className="btn btn-sm btn-outline-secondary w-100 fw-bold"
                onClick={() => { setMinPrice(0); setMaxPrice(5000000); }}
            >
                Reset Bộ Lọc
            </button>
        </div>
    );
}

export default ShopSidebar;