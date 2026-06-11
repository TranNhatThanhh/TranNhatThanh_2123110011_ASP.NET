import React from 'react';
import CategoryProductList from './components/CategoryProductList';
import ProductList from './components/ProductList';
import PostList from './components/PostList';
import './App.css'; // File chứa các style tùy biến riêng của dự án

function App() {
    return (
        <div className="container mt-5">
            {/* Phần Header của Website */}
            <header className="pb-3 mb-4 border-bottom">
                <span className="fs-4 font-weight-bold text-dark text-uppercase">
                    🛒 HỆ THỐNG CỬA HÀNG TRỰC TUYẾN - THAICMS RETAIL
                </span>
            </header>

            <div className="row">
                {/* Cột bên trái (Chức năng Sidebar): Hiển thị bộ lọc danh mục sản phẩm */}
                <div className="col-md-3">
                    <CategoryProductList />
                </div>

                {/* Cột bên phải (Chức năng Content): Dùng để hiển thị danh sách sản phẩm ở các bài học tiếp theo */}
                <div className="col-md-8">
                    <h4 className="mb-4 text-uppercase text-secondary font-weight-bold">Bộ sưu tập mới nhất</h4>
                    <ProductList />
                </div>
                {/* KHU VỰC 2: BLOG & BLOG CATEGORIES (Tin tức thời trang công sở, dạ hội) */}
                <div className="row mt-5">
                    <div className="col-12">
                        <PostList />
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="jumbotron bg-light border p-5 rounded shadow-sm">
                        <h2 className="display-5 font-weight-normal">Chào mừng đến với không gian trải nghiệm!</h2>
                        <p className="lead mt-3 text-secondary">
                            Khối dữ liệu bên thanh điều hướng trái đang được tải **Real-time** trực tiếp từ bảng <strong>CategoryProduct</strong> trong Database SQL Server thông qua nền tảng ASP.NET Core Web API (.NET 8.0).
                        </p>
                        <hr className="my-4" />
                        <p className="text-muted">Hãy đảm bảo rằng bạn đã kích hoạt CORS ở Backend để dữ liệu không bị chặn hiển thị.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
