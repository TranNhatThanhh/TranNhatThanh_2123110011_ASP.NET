import React, { useState, useEffect } from 'react';
// Import d?ch v? g?i API danh m?c s?n ph?m ?ã thi?t l?p ? Bu?i 7
import categoryProductService from '../../services/categoryProductService';




function CategoryMenu() {
    // 1. Khai báo State ?? l?u m?ng danh m?c s?n ph?m t? SQL Server ?? v?
    const [categories, setCategories] = useState([]);


    // 2. Khai báo State ?? theo dõi danh m?c nào ?ang ???c ng??i dùng b?m ch?n (M?c ??nh là ch?n t?t c? - null)
    const [activeCategoryId, setActiveCategoryId] = useState(null);


    // 3. Khai báo State qu?n lý tr?ng thái Loading d? li?u m?ng
    const [loading, setLoading] = useState(true);




    // 4. G?i API ngay khi file thành ph?n component  T?ng 3 ???c n?p lên trang ch?
    useEffect(() => {
        const fetchMenuCategories = async () => {
            try {
                setLoading(true);
                // G?i API th?c t?: GET https://localhost:xxxx/api/CategoriesProducts
                const data = await categoryProductService.getAllCategoryProducts();


                setCategories(data);
            } catch (error) {
                console.error("L?i khi kéo danh m?c s?n ph?m t? Backend:", error);
            } finally {
                setLoading(false);
            }
        };




        fetchMenuCategories();
    }, []);




    // 5. Hàm x? lý khi khách hàng click ch?n m?t danh m?c th?i trang c? th?
    const handleCategoryClick = (id) => {
        setActiveCategoryId(id);
        // ?i?m m? r?ng ?? án: ?ây là n?i sinh viên s? vi?t logic truy?n Id này sang
        // ?? ép file thành ph?n component  <ProductGrid /> (T?ng 4) t?i l?i s?n ph?m theo b? l?c.
        console.log(`Sinh viên s? x? lý l?c s?n ph?m cho danh m?c có ID: ${id}`);
    };




    // K?ch b?n giao di?n t?m th?i trong lúc h? th?ng ?ang t?i d? li?u m?ng
    if (loading) {
        return (
            <div className="container my-3 text-center">
                <div className="spinner-border spinner-border-sm text-info" role="status"></div>
                <span className="ml-2 text-muted" style={{ fontSize: '14px' }}>?ang n?p menu phân lo?i...</span>
            </div>
        );
    }




    return (
        <section id="category-menu-section" className="category-menu-wrapper my-4">
            <div className="container">
                <div className="card shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                    <div className="card-body p-2 bg-white">


                        {/* S? d?ng c?u trúc Flexbox Nav c?a Bootstrap ?? dàn ngang menu */}
                        <ul className="nav nav-pills nav-fill flex-column flex-sm-row">


                            {/* Nút m?c ??nh: Xem t?t c? s?n ph?m */}
                            <li className="nav-item m-1">
                                <button
                                    className={`nav-link w-100 font-weight-bold border-0 text-uppercase py-3 ${activeCategoryId === null ? 'active' : 'text-secondary bg-transparent'}`}
                                    style={{
                                        borderRadius: '10px',
                                        fontSize: '14px',
                                        backgroundColor: activeCategoryId === null ? '#005088' : 'transparent',
                                        transition: '0.3s'
                                    }}
                                    onClick={() => handleCategoryClick(null)}
                                >
                                    <i className="fas fa-th-large mr-2"></i> T?t c? s?n ph?m
                                </button>
                            </li>




                            {/* VÒNG L?P ??NG: Duy?t m?ng categories t? API Backend sinh ra các nút menu */}
                            {categories.map((cat) => (
                                <li className="nav-item m-1" key={cat.id}>
                                    <button
                                        className={`nav-link w-100 font-weight-bold border-0 text-uppercase py-3 ${activeCategoryId === cat.id ? 'active' : 'text-secondary bg-transparent'}`}
                                        style={{
                                            borderRadius: '10px',
                                            fontSize: '14px',
                                            backgroundColor: activeCategoryId === cat.id ? '#11CAA0' : 'transparent',
                                            color: activeCategoryId === cat.id ? '#fff' : '#6c757d',
                                            transition: '0.3s'
                                        }}
                                        onClick={() => handleCategoryClick(cat.id)}
                                    >
                                        {/* Hi?n th? tên danh m?c th?t t? SQL Server (camelCase 'name') */}
                                        {cat.name}
                                    </button>
                                </li>
                            ))}




                        </ul>




                    </div>
                </div>
            </div>
        </section>
    );
}




export default CategoryMenu;
