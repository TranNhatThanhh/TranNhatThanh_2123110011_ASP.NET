import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import logoGreenLife from '../assets/images/logo-greenlife.png';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [localInput, setLocalInput] = useState('');
    const urlSearchQuery = searchParams.get('search') || '';

    const [customer, setCustomer] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const updateCartCount = () => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                const cartData = JSON.parse(storedCart);
                const total = cartData.reduce((sum, item) => sum + (item.quantity || 1), 0);
                setCartCount(total);
            } catch {
                setCartCount(0);
            }
        } else {
            setCartCount(0);
        }
    };

    const checkAuthStatus = () => {
        const customerString = localStorage.getItem('customer');
        if (customerString) {
            try {
                const parsedCustomer = JSON.parse(customerString);
                if (parsedCustomer) {
                    setCustomer(parsedCustomer);
                    return;
                }
            } catch {
                localStorage.removeItem('customer');
                setCustomer(null);
            }
        } else {
            setCustomer(null);
        }
    };

    useEffect(() => {
        checkAuthStatus();
        updateCartCount();

        window.addEventListener('storage', updateCartCount);
        window.addEventListener('cartUpdated', updateCartCount);
        window.addEventListener('authUpdated', checkAuthStatus);

        setDropdownOpen(false);

        return () => {
            window.removeEventListener('storage', updateCartCount);
            window.removeEventListener('cartUpdated', updateCartCount);
            window.removeEventListener('authUpdated', checkAuthStatus);
        };
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogoutSubmit = (e) => {
        if (e) e.preventDefault();
        if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
            localStorage.removeItem('customer');
            setCustomer(null);
            setDropdownOpen(false);

            window.dispatchEvent(new Event('authUpdated'));

            alert("🔒 ĐÃ ĐĂNG XUẤT: Phiên làm việc của bạn đã kết thúc!");
            navigate('/');
        }
    };

    useEffect(() => {
        setLocalInput(urlSearchQuery);
    }, [urlSearchQuery]);

    const isActive = (path) => {
        return location.pathname === path ? 'text-success fw-bold' : 'text-dark';
    };

    // 🌟 HÀM XỬ LÝ SỰ KIỆN KHI ẤN ENTER HOẶC CLICK KÍNH LÚP (BẮT TỨC THÌ)
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmedInput = localInput.trim();

        if (trimmedInput !== '') {
            navigate(`/shop?search=${encodeURIComponent(trimmedInput)}`);
        } else {
            navigate('/shop');
        }
    };

    useEffect(() => {
        if (localInput === urlSearchQuery) return;

        const delayDebounce = setTimeout(() => {
            const currentPath = location.pathname;

            if (currentPath === '/' || currentPath === '/shop') {
                if (localInput.trim() !== '') {
                    navigate(`${currentPath}?search=${encodeURIComponent(localInput)}`, { replace: true });
                } else {
                    navigate(currentPath, { replace: true });
                }
            } else {
                if (localInput.trim() !== '') {
                    navigate(`/shop?search=${encodeURIComponent(localInput)}`);
                } else {
                    navigate('/shop');
                }
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [localInput, navigate, location.pathname, urlSearchQuery]);

    const getCustomerName = () => {
        if (!customer) return "Thành viên";
        const target = customer.customer || customer.data || customer.user || customer;
        const name = target.fullName || target.FullName ||
            target.hoTen || target.HoTen ||
            target.name || target.Name ||
            target.userName || target.UserName;

        if (name) return name;
        return target.email || target.Email || "Thành viên";
    };

    return (
        <header className="main-header-wrapper bg-white shadow-sm sticky-top">

            {/* THANH TOP BAR DANH CHO LIÊN HỆ VÀ ĐĂNG NHẬP / ĐĂNG XUẤT */}
            <div className="top-bar bg-dark py-2 text-white" style={{ fontSize: '13px' }}>
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="top-bar-left">
                        <span className="me-3">
                            <i className="fas fa-phone-alt me-1"></i> Hotline: 090x.xxx.xxx
                        </span>
                        <span>
                            <i className="fas fa-envelope me-1"></i> Email: support@thanhcms.retail
                        </span>
                    </div>

                    <div className="top-bar-right">
                        {customer ? (
                            <ul className="nav justify-content-end p-0 m-0" style={{ listStyle: 'none' }}>
                                <li className="nav-item dropdown" ref={dropdownRef} style={{ position: 'relative' }}>
                                    <a
                                        className="nav-link dropdown-toggle p-0 text-white font-weight-bold text-decoration-none d-flex align-items-center"
                                        href="#"
                                        id="topBarAuthDropdown"
                                        role="button"
                                        onClick={(e) => { e.preventDefault(); setDropdownOpen(!dropdownOpen); }}
                                        style={{ cursor: 'pointer', gap: '5px' }}
                                    >
                                        <i className="fas fa-user-circle text-info"></i> Chào, {getCustomerName()}
                                    </a>

                                    <div
                                        className={`dropdown-menu dropdown-menu-end shadow border-0 mt-2 ${dropdownOpen ? 'show' : ''}`}
                                        aria-labelledby="topBarAuthDropdown"
                                        style={{
                                            borderRadius: '8px',
                                            zIndex: 9999,
                                            minWidth: '160px',
                                            position: 'absolute',
                                            right: 0,
                                            top: '100%',
                                            display: dropdownOpen ? 'block' : 'none'
                                        }}
                                    >
                                        <Link className="dropdown-item small font-weight-bold text-secondary py-2 text-decoration-none d-flex align-items-center" to="/profile" style={{ gap: '8px' }}>
                                            <i className="fas fa-id-card text-primary"></i> Hồ sơ cá nhân
                                        </Link>
                                        <Link className="dropdown-item small font-weight-bold text-secondary py-2 text-decoration-none d-flex align-items-center" to="/my-orders" style={{ gap: '8px' }}>
                                            <i className="fas fa-box-open text-success"></i> Đơn hàng của tôi
                                        </Link>
                                        <div className="dropdown-divider my-1" style={{ borderTop: '1px solid #e9ecef' }}></div>
                                        <button
                                            className="dropdown-item small font-weight-bold text-danger py-2 w-100 text-left border-0 bg-transparent d-flex align-items-center"
                                            onClick={handleLogoutSubmit}
                                            style={{ cursor: 'pointer', gap: '8px' }}
                                        >
                                            <i className="fas fa-sign-out-alt"></i> Đăng xuất
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        ) : (
                            <div className="d-flex align-items-center" style={{ gap: '12px' }}>
                                <Link to="/login" className="text-white text-decoration-none font-weight-bold">
                                    <i className="fas fa-user me-1"></i> Đăng nhập
                                </Link>
                                <span className="text-white-50">/</span>
                                <Link to="/register" className="text-white text-decoration-none font-weight-bold">
                                    <i className="fas fa-user-plus me-1"></i> Đăng ký
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* KHU VỰC LOGO, THANH TÌM KIẾM VÀ GIỎ HÀNG GREENLIFE */}
            <div className="main-header py-3 border-bottom">
                <div className="container">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center" style={{ gap: '15px' }}>

                        <Link to="/" className="navbar-brand m-0">
                            <img
                                src={logoGreenLife}
                                alt="GreenLife Garden Logo"
                                style={{ height: '50px', width: 'auto', objectFit: 'contain' }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    document.getElementById('logo-text').style.display = 'block';
                                }}
                            />
                            <span id="logo-text" className="fw-bold text-success fs-4" style={{ display: 'none' }}>GEAR</span>
                        </Link>

                        {/* 🛠️ THANH TÌM KIẾM ĐÃ SỬA: ĐƯỢC GẮN HÀM handleSearchSubmit KÍCH HOẠT NHANH */}
                        <form
                            className="input-group input-group-sm"
                            style={{ maxWidth: '400px', width: '100%', border: '1px solid #ced4da', borderRadius: '20px', overflow: 'hidden' }}
                            onSubmit={handleSearchSubmit}
                        >
                            <input
                                type="text"
                                className="form-control border-0"
                                placeholder="Tìm kiếm"
                                style={{ fontSize: '13px', boxShadow: 'none' }}
                                value={localInput}
                                onChange={(e) => setLocalInput(e.target.value)}
                            />
                            <button className="btn bg-white text-success border-0 d-flex align-items-center px-3" type="submit">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </form>

                        <div className="text-right">
                            <Link to="/cart" className="position-relative text-dark p-2 text-decoration-none d-inline-block">
                                <i className="fa-solid fa-basket-shopping text-success" style={{ fontSize: '1.4rem' }}></i>
                                {cartCount > 0 && (
                                    <span
                                        className="position-absolute badge rounded-circle bg-danger text-white d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '18px',
                                            height: '18px',
                                            fontSize: '10px',
                                            fontWeight: 'bold',
                                            top: '4px',
                                            right: '4px',
                                            transform: 'translate(40%, -40%)',
                                            padding: '0',
                                            lineHeight: '1'
                                        }}
                                    >
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

            {/* THANH MENU ĐIỀU HƯỚNG CHÍNH */}
            <div className="main-navigation bg-white py-2">
                <div className="container">
                    <nav className="d-flex align-items-center" style={{ fontSize: '15px', gap: '25px' }}>
                        <Link to="/" className={`text-decoration-none ${isActive('/')}`}>Trang Chủ</Link>
                        <Link to="/shop" className={`text-decoration-none ${isActive('/shop')}`}>Cửa Hàng</Link>
                        <Link to="/blog" className={`text-decoration-none ${isActive('/blog')}`}>Tin Tức / Blog</Link>
                        <Link to="/about" className={`text-decoration-none ${isActive('/about')}`}>Về Chúng Tôi</Link>
                    </nav>
                </div>
            </div>

        </header>
    );
}

export default Header;