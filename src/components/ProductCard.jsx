import React from 'react';
import { Link } from 'react-router-dom'; // ?? ?Ã THÊM: Th? vi?n ?i?u h??ng Single Page

const IMAGE_BASE_URL = "https://localhost:7011";

function ProductCard({ item }) {
    // Hàm ??nh d?ng ti?n t? VN? chu?n
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    // ?? THÊM M?I: Hàm x? lý thêm ch?u cây vào gi? hàng th?c t? khi click
    const handleAddToCart = () => {
        // 1. L?y gi? hàng hi?n t?i t? trình duy?t (n?u ch?a có thì t?o m?ng r?ng)
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // 2. Ki?m tra xem ch?u cây này ?ã ???c b?m mua tr??c ?ó ch?a
        const existingItem = cart.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            // N?u có r?i -> Ki?m tra s? l??ng kho xem còn ?? không
            if (existingItem.quantity >= item.stockQuantity) {
                alert(`R?t ti?c! S? l??ng trong kho c?a GreenLife ch? còn ${item.stockQuantity} ch?u.`);
                return;
            }
            // T?ng s? l??ng lên 1
            existingItem.quantity += 1;
        } else {
            // N?u ch?a có -> Thêm m?i b?n ghi ch?u cây này vào gi? hàng v?i s? l??ng ban ??u = 1
            cart.push({
                id: item.id,
                name: item.name,
                price: item.price,
                imageUrl: item.imageUrl,
                stockQuantity: item.stockQuantity,
                quantity: 1
            });
        }

        // 3. L?u m?ng gi? hàng m?i c?p nh?t l?i vào trình duy?t
        localStorage.setItem('cart', JSON.stringify(cart));

        // 4. Phát tín hi?u s? ki?n ng?m ?? thanh Header ??ng (? bài tr??c) t? nh?y s? l??ng l?p t?c
        window.dispatchEvent(new Event('cartUpdated'));

        // 5. Thông báo cho ng??i dùng
        alert(`?ã thêm cây [${item.name}] vào gi? hàng thành công!`);
    };

    return (
        <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '12px', overflow: 'hidden', transition: '0.3s' }}>
            <div className="position-relative overflow-hidden" style={{ height: '260px', backgroundColor: '#f1f5f1' }}>
                <img
                    src={`${IMAGE_BASE_URL}/images/${item.imageUrl}`}
                    className="card-img-top w-100 h-100"
                    alt={item.name}
                    style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
                {item.stockQuantity <= 5 && (
                    <span className="badge bg-warning text-dark position-absolute px-2 py-1" style={{ top: '15px', left: '15px', borderRadius: '4px', fontSize: '11px' }}>
                        S?p h?t hàng / Còn {item.stockQuantity} ch?u
                    </span>
                )}
            </div>
            <div className="card-body d-flex flex-column p-3">
                <h6 className="card-title fw-bold text-dark text-truncate mb-1" title={item.name} style={{ fontSize: '16px' }}>
                    {item.name}
                </h6>
                <p className="card-text fw-bold text-success mb-3" style={{ fontSize: '17px' }}>
                    {formatCurrency(item.price)}
                </p>
                <div className="mt-auto pt-2 border-top d-flex justify-content-between">
                    {/* Link ?i?u h??ng xem chi ti?t ch?u cây */}
                    <Link to={`/product/${item.id}`} className="btn btn-sm btn-outline-success fw-bold px-3 d-flex align-items-center justify-content-center" style={{ borderRadius: '20px', flexGrow: 1 }}>
                        <i className="fas fa-eye me-1"></i> Chi ti?t
                    </Link>

                    {/* ?? NÚT CH?N MUA ?Ã ???C K?T N?I HÀM X? LÝ ??NG TH?C T? */}
                    <button
                        className="btn btn-sm text-white fw-bold px-3 ms-2"
                        style={{ borderRadius: '20px', backgroundColor: '#4caf50', border: 'none', flexGrow: 1 }}
                        onClick={handleAddToCart}
                    >
                        <i className="fas fa-cart-plus me-1"></i> Ch?n mua
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;