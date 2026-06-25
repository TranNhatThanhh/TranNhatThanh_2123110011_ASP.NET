import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShopHeader from './ShopHeader';
import ShopSidebar from './ShopSidebar';
import ProductGrid from '../home/ProductGrid'; // Dùng chung layout card dạng ô vuông
import ProductList from './ProductList';
import LoadingOrEmpty from './LoadingOrEmpty';

function Shop() {
    const [products, setProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 6;

    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('default');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000000);
    useEffect(() => {
        setLoading(true);
        axios.get(`https://localhost:7195/api/products?page=${currentPage}&pageSize=${pageSize}`)
            .then(res => {
                // LƯU Ý: Đọc đúng trường thuộc tính chữ hoa/thường từ C# trả về
                setProducts(res.data.data || res.data.Data);
                setTotalPages(res.data.totalPages || res.data.TotalPages || 1);
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi lấy danh sách sản phẩm:", err);
                setLoading(false);
            });
    }, [currentPage]);

    useEffect(() => {
        let result = [...products];

        // SỬA TẠI ĐÂY: Thêm p.name?.toLowerCase() để tránh lỗi khi trường name bị null/undefined
        if (searchTerm) {
            result = result.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // Lọc theo khoảng giá
        result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);

        // Sắp xếp theo giá bán
        if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
        if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);

        setDisplayProducts(result);
    }, [searchTerm, sortBy, minPrice, maxPrice, products]);

    return (
        <div className="container my-5">
            <ShopHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} viewMode={viewMode} setViewMode={setViewMode} sortBy={sortBy} setSortBy={setSortBy} />
            <div className="row g-4">
                <div className="col-lg-3">
                    <ShopSidebar minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
                </div>
                <div className="col-lg-9">
                    {loading || displayProducts.length === 0 ? (
                        <LoadingOrEmpty loading={loading} />
                    ) : viewMode === 'grid' ? (
                        <ProductGrid products={displayProducts} />
                    ) : (
                        <ProductList products={displayProducts} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Shop;