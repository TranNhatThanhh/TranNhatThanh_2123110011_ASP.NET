// Chức năng: Hiển thị danh mục sản phẩm dạng khối ảnh tròn/vuông kích thích click (Tiêu chí 38)
import React, { useState, useEffect } from 'react';
import categoryProductService from '../../services/categoryProductService';

const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL || 'https://localhost:7004';

// Màu nền gradient dự phòng cho từng danh mục khi chưa có ảnh
const FALLBACK_COLORS = [
    'linear-gradient(135deg, #b30000, #ff6b6b)',
    'linear-gradient(135deg, #1a202c, #4a5568)',
    'linear-gradient(135deg, #2d3748, #b30000)',
    'linear-gradient(135deg, #c53030, #feb2b2)',
    'linear-gradient(135deg, #1c1c2e, #c53030)',
    'linear-gradient(135deg, #742a2a, #fc8181)',
];

// Icon đại diện cho từng danh mục (theo thứ tự)
const FALLBACK_ICONS = ['🔧', '🚗', '⚙️', '🛞', '🔩', '💡', '🔑', '🏎️'];

const CategoryProductList = ({ selectedCategoryId, onSelectCategory, isHorizontal = false }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryProductService.getAllCategoryProducts();
                setCategories(data || []);
            } catch (err) {
                console.error('Lỗi tải danh mục:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-3">
                <div className="spinner-border spinner-border-sm text-danger" role="status"></div>
            </div>
        );
    }

    return (
        <div 
            className={isHorizontal ? "d-flex align-items-center overflow-auto py-3 custom-scrollbar hide-scrollbar category-horizontal-container" : ""}
            style={isHorizontal ? { gap: '15px', paddingBottom: '10px' } : {}}
        >
            {/* NÚT XEM TẤT CẢ */}
            <div
                className={`d-flex align-items-center justify-content-center cursor-pointer ${
                    selectedCategoryId === null ? 'bg-danger text-white' : 'bg-white text-dark'
                } ${isHorizontal ? "rounded-pill shadow-sm px-4 py-2" : "px-3 py-2"}`}
                style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    borderLeft: (!isHorizontal && selectedCategoryId === null) ? '4px solid #fff' : (!isHorizontal ? '4px solid transparent' : 'none'),
                    border: isHorizontal ? (selectedCategoryId === null ? '2px solid #b30000' : '1px solid #e2e8f0') : 'none',
                    minWidth: isHorizontal ? 'max-content' : 'auto',
                    transform: isHorizontal && selectedCategoryId === null ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: isHorizontal && selectedCategoryId === null ? '0 4px 12px rgba(227, 0, 15, 0.3)' : '0 2px 5px rgba(0,0,0,0.05)'
                }}
                onClick={() => onSelectCategory(null)}
                onMouseEnter={(e) => { if(isHorizontal && selectedCategoryId !== null) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { if(isHorizontal && selectedCategoryId !== null) e.currentTarget.style.transform = 'translateY(0)'; }}
            >
                <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>🏪</span>
                <span className="font-weight-bold small text-uppercase" style={{ letterSpacing: '0.5px' }}>Tất cả sản phẩm</span>
            </div>

            {/* DANH SÁCH DANH MỤC DẠNG KHỐI */}
            <div className={isHorizontal ? "d-flex align-items-center" : "p-2"} style={isHorizontal ? { gap: '15px' } : {}}>
                {categories.map((cat, index) => {
                    const isSelected = selectedCategoryId === cat.id;
                    const imgUrl = cat.imageUrl
                        ? (cat.imageUrl.startsWith('http') ? cat.imageUrl : `${IMAGE_BASE_URL}${cat.imageUrl}`)
                        : null;
                    const fallbackColor = FALLBACK_COLORS[index % FALLBACK_COLORS.length];
                    const fallbackIcon = FALLBACK_ICONS[index % FALLBACK_ICONS.length];

                    return (
                        <div
                            key={cat.id}
                            className={`d-flex align-items-center cursor-pointer ${
                                isSelected ? 'bg-danger text-white' : 'bg-white text-dark'
                            } ${isHorizontal ? "rounded-pill shadow-sm px-3 py-2" : "mb-2 rounded p-2"}`}
                            style={{
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                minWidth: isHorizontal ? 'max-content' : 'auto',
                                border: isHorizontal ? (isSelected ? '2px solid #b30000' : '1px solid #e2e8f0') : (isSelected ? '2px solid #b30000' : '2px solid transparent'),
                                transform: isHorizontal && isSelected ? 'translateY(-2px)' : 'translateY(0)',
                                boxShadow: isHorizontal && isSelected ? '0 4px 12px rgba(227, 0, 15, 0.3)' : (isHorizontal ? '0 2px 5px rgba(0,0,0,0.05)' : (isSelected ? '0 2px 8px rgba(179,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.1)'))
                            }}
                            onClick={() => onSelectCategory(cat.id)}
                            onMouseEnter={(e) => { if(isHorizontal && !isSelected) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={(e) => { if(isHorizontal && !isSelected) e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            {/* Ảnh/Icon đại diện danh mục */}
                            <div
                                style={{
                                    width: isHorizontal ? '36px' : '44px',
                                    height: isHorizontal ? '36px' : '44px',
                                    borderRadius: '50%',
                                    flexShrink: 0,
                                    overflow: 'hidden',
                                    background: imgUrl ? 'transparent' : fallbackColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '10px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                            >
                                {imgUrl ? (
                                    <img
                                        src={imgUrl}
                                        alt={cat.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={e => { e.target.style.display = 'none'; }}
                                    />
                                ) : (
                                    <span style={{ fontSize: isHorizontal ? '1.1rem' : '1.4rem' }}>{fallbackIcon}</span>
                                )}
                            </div>

                            {/* Tên danh mục */}
                            <div style={{ flex: 1, minWidth: 0, paddingRight: isHorizontal ? '5px' : '0' }}>
                                <div
                                    className="font-weight-bold small text-uppercase"
                                    style={{
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        letterSpacing: '0.5px',
                                        color: isSelected ? 'white' : '#2d3748'
                                    }}
                                >
                                    {cat.name}
                                </div>
                                {!isHorizontal && cat.description && (
                                    <div className="" style={{ fontSize: '0.7rem', opacity: 0.7, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                        {cat.description}
                                    </div>
                                )}
                            </div>

                            {/* Mũi tên chỉ hướng */}
                            {isSelected && !isHorizontal && <i className="fa-solid fa-chevron-right ml-auto" style={{ color: 'white', fontSize: '0.8rem' }}></i>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryProductList;
