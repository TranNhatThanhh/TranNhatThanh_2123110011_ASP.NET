import React, { useState } from 'react';

const IMAGE_BASE_URL = "https://localhost:7195"; // ??ng b? Port Backend C#

function ProductInfo({ product }) {
    // Component con t? qu?n lý State s? l??ng ??t mua c?a riêng nó
    const [quantity, setQuantity] = useState(1);

    // Bóc tách an toàn h? tr? c? ch? HOA/th??ng c?a th?c th? Model C#
    const id = product?.id || product?.Id || product?.maCay || product?.MaCay;
    const name = product?.name || product?.Name || "Cây c?nh GreenLife";
    const price = product?.price || product?.Price || 0;
    const imageUrl = product?.imageUrl || product?.ImageUrl || "";
    const stockQuantity = product?.stockQuantity !== undefined ? (product.stockQuantity) : (product?.StockQuantity || 0);
    const description = product?.description || product?.Description || "Ch?a có mô t? chi ti?t cho lo?i cây c?nh này.";

    // Hàm ??nh d?ng ti?n t? VN? chu?n
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    // ?? HÀM X? LÝ NGHI?P V? GI? HÀNG (?Ã S?A ??I ??NG B? 100%)
    const handleAddToCart = () => {
        // 1. Ki?m tra kho ngay l?p t?c
        if (quantity > stockQuantity) {
            alert(`?? S? l??ng trong kho không ??! Hi?n t?i h? th?ng ch? còn ${stockQuantity} ch?u.`);
            return;
        }

        // 2. L?y danh sách gi? hàng hi?n t?i trong máy lên
        const storedCart = localStorage.getItem('cart');
        let cart = storedCart ? JSON.parse(storedCart) : [];

        // 3. T?o c?u trúc ??i t??ng s?n ph?m chu?n hóa ?? ??a vào gi?
        const productToAdd = {
            id: id,
            name: name,
            price: price,
            imageUrl: imageUrl,
            stockQuantity: stockQuantity,
            quantity: quantity // L?y s? l??ng t? ô input t?ng gi?m
        };

        // 4. Ki?m tra xem cây này ?ã t?ng ???c b?m thêm tr??c ?ó ch?a
        const existingItemIndex = cart.findIndex(item => item.id === productToAdd.id);

        if (existingItemIndex > -1) {
            // N?u có r?i -> C?ng d?n s? l??ng ??t m?i vào s? l??ng c?
            const newQty = cart[existingItemIndex].quantity + productToAdd.quantity;

            // Ch?n n?u t?ng s? l??ng v??t quá hàng t?n trong kho SQL
            if (newQty > stockQuantity) {
                alert(`?? T?ng s? l??ng trong gi? hàng v??t quá s? l??ng kho! B?n ?ã có ${cart[existingItemIndex].quantity} ch?u trong gi?, kho ch? còn ${stockQuantity} ch?u.`);
                return;
            }
            cart[existingItemIndex].quantity = newQty;
        } else {
            // N?u ch?a có -> Thêm m?i tinh vào m?ng
            cart.push(productToAdd);
        }

        // 5. L?u l?i m?ng m?i vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // 6. ?? KÍCH HO?T S? KI?N TOÀN C?C: Ép vòng tròn ?? trên Header nh?y s? l?p t?c không c?n F5
        window.dispatchEvent(new Event('cartUpdated'));

        alert(`?? THÀNH CÔNG: ?ã ??t ${quantity} ch?u cây [${name}] vào gi? hàng c?a b?n!`);
    };

    return (
        <div className="row bg-white p-4 shadow-sm" style={{ borderRadius: '15px' }}>

            {/* Trình duy?t tri?t tiêu hoàn toàn 2 nút m?i tên lên xu?ng */}
            <style>{`
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none !important;
                    margin: 0;
                }
                input[type=number] {
                    -moz-appearance: textfield !important;
                }
            `}</style>

            {/* C?t trái: Hi?n th? hình ?nh ch?u cây c?nh */}
            <div className="col-md-6 mb-4 mb-md-0">
                <div className="product-image-wrapper border" style={{ height: '400px', borderRadius: '12px', overflow: 'hidden' }}>
                    <img
                        src={imageUrl ? `${IMAGE_BASE_URL}/images/${imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl}` : 'https://via.placeholder.com/400x400?text=GreenLife+Garden'}
                        alt={name}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>

            {/* C?t ph?i: Toàn b? thông tin tên, giá, mô t? và c?m nút b?m */}
            <div className="col-md-6 d-flex flex-column pl-md-4">
                <h2 className="fw-bold text-dark mb-2">{name}</h2>

                {/* Giá bán s?n ph?m */}
                <h3 className="text-danger fw-bold my-3">{formatCurrency(price)}</h3>

                {/* S? l??ng t?n kho v?t lý th?c t? trong SQL Server */}
                <p className="text-muted mb-4">
                    <span className="badge bg-light text-dark border p-2" style={{ fontSize: '13px' }}>
                        <i className="fas fa-warehouse me-1 text-secondary"></i> Kho hi?n có: <strong>{stockQuantity}</strong> ch?u
                    </span>
                </p>

                {/* Kh?i k?t xu?t thông tin mô t? chi ti?t cây c?nh */}
                <div className="product-description-box border-top pt-3 mb-4">
                    <h6 className="fw-bold text-secondary mb-2">Mô t? s?n ph?m:</h6>
                    <p className="text-secondary text-justify" style={{ lineHeight: '1.6', fontSize: '15px' }}>
                        {description}
                    </p>
                </div>

                {/* B? công c? t?ng gi?m s? l??ng mua & Nút mua ngay ??y sát ?áy */}
                <div className="mt-auto border-top pt-3">
                    <div className="d-flex align-items-center mb-3">
                        <span className="me-3 text-secondary fw-bold">S? l??ng ??t:</span>
                        <div className="input-group" style={{ width: '130px' }}>
                            <button className="btn btn-outline-secondary" type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                            <input
                                type="number"
                                className="form-control text-center"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            />
                            <button className="btn btn-outline-secondary" type="button" onClick={() => setQuantity(q => q + 1)}>+</button>
                        </div>
                    </div>

                    <button
                        className="btn btn-success btn-lg w-100 fw-bold py-3 text-uppercase"
                        style={{ borderRadius: '30px', backgroundColor: '#2e7d32', borderColor: '#2e7d32' }}
                        onClick={handleAddToCart}
                    >
                        <i className="fas fa-cart-plus me-2"></i> Thêm vào gi? hàng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductInfo;