import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CategoryProductList from '../../components/features/CategoryProductList';
import SearchResults from '../../components/features/SearchResults';

const SearchPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    const urlMinPrice = searchParams.get('minPrice');
    const urlMaxPrice = searchParams.get('maxPrice');

    const [inputMin, setInputMin] = useState(urlMinPrice || '');
    const [inputMax, setInputMax] = useState(urlMaxPrice || '');

    useEffect(() => {
        setInputMin(urlMinPrice || '');
        setInputMax(urlMaxPrice || '');
    }, [urlMinPrice, urlMaxPrice]);

    const handleApplyPrice = (e) => {
        e.preventDefault();
        if (inputMin) searchParams.set('minPrice', inputMin); else searchParams.delete('minPrice');
        if (inputMax) searchParams.set('maxPrice', inputMax); else searchParams.delete('maxPrice');
        setSearchParams(searchParams);
    };

    const handleClearPrice = () => {
        setInputMin(''); setInputMax('');
        searchParams.delete('minPrice'); searchParams.delete('maxPrice');
        setSearchParams(searchParams);
    };

    return (
        <div className="container-fluid px-xl-5 mt-4">
            <div className="row">
                {/* SIDEBAR TÌM KIẾM */}
                <div className="col-xl-3 col-lg-4 mb-4">
                    <div className="sticky-sidebar custom-scrollbar" style={{ position: 'sticky', top: '20px', zIndex: 100, maxHeight: 'calc(100vh - 40px)', overflowY: 'auto' }}>
                        <div className="classic-sidebar bg-white mb-4 shadow-sm border border-top-0">
                            <div className="sidebar-header text-white p-3 font-weight-bold text-uppercase d-flex align-items-center" style={{ backgroundColor: '#1a202c' }}>
                                <i className="fa-solid fa-bars mr-3 fa-lg"></i> DANH MỤC SẢN PHẨM
                            </div>
                            <div className="sidebar-content">
                                <CategoryProductList
                                    selectedCategoryId={null}
                                    onSelectCategory={(id) => {
                                        let extraQuery = '';
                                        if (urlMinPrice) extraQuery += `&minPrice=${urlMinPrice}`;
                                        if (urlMaxPrice) extraQuery += `&maxPrice=${urlMaxPrice}`;
                                        const queryStr = extraQuery ? '?' + extraQuery.substring(1) : '';
                                        if (id === null) navigate(`/products${queryStr}`);
                                        else navigate(`/products/category/${id}${queryStr}`);
                                    }}
                                />
                            </div>
                        </div>

                        {/* LỌC GIÁ */}
                        <div className="classic-sidebar bg-white mb-4 shadow-sm border border-top-0 rounded-bottom">
                            <div className="sidebar-header p-3 font-weight-bold text-uppercase d-flex align-items-center border-bottom" style={{ color: '#556270' }}>
                                <i className="fa-solid fa-money-bill-wave text-success mr-2 fa-lg"></i> LỌC THEO GIÁ PHỤ TÙNG
                            </div>
                            <div className="sidebar-content p-3">
                                <p className="text-muted mb-2">Thiết lập mức giá trần tối đa (VND):</p>
                                <input
                                    type="number"
                                    className="form-control font-weight-bold text-dark mb-4"
                                    style={{ fontSize: '1.2rem', borderRadius: '8px', border: '1px solid #ced4da' }}
                                    value={inputMax}
                                    onChange={(e) => setInputMax(e.target.value)}
                                    onBlur={(e) => {
                                        const val = e.target.value;
                                        if (val) searchParams.set('maxPrice', val);
                                        else searchParams.delete('maxPrice');
                                        searchParams.delete('minPrice');
                                        setSearchParams(searchParams);
                                    }}
                                />

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-muted">Kéo chọn khoảng giá:</span>
                                    <span className="text-danger font-weight-bold">
                                        &le; {inputMax ? Number(inputMax).toLocaleString('vi-VN') : '50.000.000'} đ
                                    </span>
                                </div>
                                
                                <input 
                                    type="range" 
                                    className="form-range custom-range w-100" 
                                    min="0" 
                                    max="50000000" 
                                    step="500000"
                                    value={inputMax || 50000000}
                                    onChange={(e) => setInputMax(e.target.value)}
                                    onMouseUp={(e) => {
                                        searchParams.set('maxPrice', e.target.value);
                                        searchParams.delete('minPrice');
                                        setSearchParams(searchParams);
                                    }}
                                    onTouchEnd={(e) => {
                                        searchParams.set('maxPrice', e.target.value);
                                        searchParams.delete('minPrice');
                                        setSearchParams(searchParams);
                                    }}
                                />
                                <div className="d-flex justify-content-between text-muted small mt-1">
                                    <span>0đ</span>
                                    <span>50.000.000đ</span>
                                </div>

                                <hr className="my-4 border-secondary" style={{ opacity: '0.2' }} />
                                
                                <form onSubmit={handleApplyPrice}>
                                    <p className="small text-muted font-weight-bold mb-2">HOẶC NHẬP TỰ DO:</p>
                                    <div className="d-flex align-items-center mb-3">
                                        <input
                                            type="number"
                                            className="form-control form-control-sm text-center border-secondary"
                                            placeholder="TỪ"
                                            value={inputMin}
                                            onChange={(e) => setInputMin(e.target.value)}
                                            min="0"
                                        />
                                        <span className="mx-2 text-muted font-weight-bold">-</span>
                                        <input
                                            type="number"
                                            className="form-control form-control-sm text-center border-secondary"
                                            placeholder="ĐẾN"
                                            value={inputMax}
                                            onChange={(e) => setInputMax(e.target.value)}
                                            min="0"
                                        />
                                    </div>
                                    <div className="row no-gutters">
                                        <div className="col-6 pr-1">
                                            <button type="submit" className="btn btn-danger btn-block btn-sm font-weight-bold text-uppercase shadow-sm">
                                                Áp dụng
                                            </button>
                                        </div>
                                        <div className="col-6 pl-1">
                                            <button type="button" onClick={handleClearPrice} className="btn btn-light border btn-block btn-sm font-weight-bold text-uppercase text-muted shadow-sm">
                                                Xóa lọc
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-9 col-lg-8">
                    <div className="products-wrapper bg-white p-4 shadow-sm border mb-4">
                        <h4 className="text-danger font-weight-bold border-bottom border-danger pb-2 mb-4 text-uppercase">KẾT QUẢ TÌM KIẾM CHO: "{keyword}"</h4>
                        <SearchResults
                            keyword={keyword}
                            minPrice={urlMinPrice ? parseInt(urlMinPrice) : null}
                            maxPrice={urlMaxPrice ? parseInt(urlMaxPrice) : null}
                            onSelectProduct={(id) => navigate(`/product/${id}`)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
