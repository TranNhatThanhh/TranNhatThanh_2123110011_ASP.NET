import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CategoryMenu({ activeCategoryId, onSelectCategory }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Hãy chắc chắn rằng bạn có endpoint /api/categories hoặc /api/categoryProductId ở cổng 7195
        axios.get("https://localhost:7195/api/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.error("Lỗi lấy danh mục:", err));
    }, []);

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h4 className="font-weight-bold text-dark text-uppercase m-0 fw-bold">Danh Mục Sản Phẩm</h4>
                <div className="mx-auto" style={{ width: '60px', height: '3px', backgroundColor: '#0d6efd', marginTop: '8px' }}></div>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-3">
                <button
                    className={`btn px-4 py-3 fw-bold shadow-sm ${activeCategoryId === null ? 'btn-primary' : 'btn-light text-dark'}`}
                    onClick={() => onSelectCategory(null)}
                    style={{ borderRadius: '12px', minWidth: '140px' }}
                >
                    🚀 Tất Cả
                </button>

                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className={`btn px-4 py-3 fw-bold shadow-sm ${activeCategoryId === cat.id ? 'btn-primary' : 'btn-light text-dark'}`}
                        onClick={() => onSelectCategory(cat.id)}
                        style={{ borderRadius: '12px', minWidth: '140px' }}
                    >
                        ⚙️ {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CategoryMenu;