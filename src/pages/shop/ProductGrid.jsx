import React, { useState, useEffect } from 'react';
import productService from '../../services/productService';
// IMPORT file thành ph?n component  CON VÀO ?? S? D?NG
import ProductCard from '../../components/ProductCard';




function ProductGrid() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);




    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("L?i h? th?ng khi t?i danh sách s?n ph?m:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllProducts();
    }, []);




    if (loading) {
        return (
            <div className="container my-5 text-center">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">?ang t?i danh sách trang ph?c m?i nh?t...</p>
            </div>
        );
    }




    return (
        <section className="product-grid-wrapper py-4">
            <div className="container">


                <div className="section-heading mb-4 d-flex justify-content-between align-items-center border-bottom pb-2">
                    <h4 className="font-weight-bold text-uppercase m-0" style={{ color: '#005088' }}>
                        <i className="fas fa-sparkles mr-2 text-warning"></i> S?n ph?m n?i b?t
                    </h4>
                    <span className="text-muted" style={{ fontSize: '14px' }}>
                        Hi?n th? ({products.length}) s?n ph?m
                    </span>
                </div>




                {/* KHUNG L??I GRID SYSTEM */}
                <div className="row">
                    {products.map((product) => (
                        <div className="col-xl-3 col-lg-4 col-sm-6 col-12 mb-4" key={product.id}>
                            {/* CHÈN ?ÚNG file thành ph?n component  CON T?I ?ÂY VÀ TRUY?N D? LI?U ?I */}
                            <ProductCard item={product} />
                        </div>
                    ))}
                </div>




            </div>
        </section>
    );
}




export default ProductGrid;
