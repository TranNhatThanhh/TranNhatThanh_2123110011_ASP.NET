import React from 'react';

function ShopHeader({ searchTerm, setSearchTerm, viewMode, setViewMode, sortBy, setSortBy }) {
    return (
        <div className="bg-white p-4 shadow-sm border rounded-3 mb-4 text-start">
            <div className="row g-3 align-items-center">
                {/* Thanh tìm kiếm */}
                <div className="col-md-5">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="🔍 Tìm kiếm sản phẩm công nghệ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* Bộ lọc sắp xếp giá */}
                <div className="col-md-4 col-sm-7">
                    <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="default">Sắp xếp mặc định</option>
                        <option value="price-asc">Giá: Thấp đến Cao</option>
                        <option value="price-desc">Giá: Cao đến Thấp</option>
                    </select>
                </div>
                {/* Nút chuyển đổi View Chế độ hiển thị */}
                <div className="col-md-3 col-sm-5 text-sm-end">
                    <div className="btn-group" role="group">
                        <button
                            type="button"
                            className={`btn ${viewMode === 'grid' ? 'btn-dark' : 'btn-outline-dark'}`}
                            onClick={() => setViewMode('grid')}
                        >
                            Grid
                        </button>
                        <button
                            type="button"
                            className={`btn ${viewMode === 'list' ? 'btn-dark' : 'btn-outline-dark'}`}
                            onClick={() => setViewMode('list')}
                        >
                            List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopHeader;