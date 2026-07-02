import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import orderService from '../../services/orderService';

const ProfilePage = () => {
    const { setLoggedInUser } = useOutletContext();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    
    // Pagination cho lịch sử đơn hàng
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        const savedUser = localStorage.getItem('khanhcms_user');
        if (!savedUser) {
            navigate('/login');
            return;
        }

        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setFormData({
            fullName: parsedUser.fullName || '',
            phone: parsedUser.phone || '',
            address: parsedUser.address || ''
        });

        fetchOrders(parsedUser.id);
    }, [navigate]);

    const fetchOrders = async (customerId) => {
        try {
            const response = await orderService.getCustomerOrders(customerId);
            setOrders(response || []);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách đơn hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await authService.updateProfile({
                id: user.id,
                fullName: formData.fullName,
                phone: formData.phone,
                address: formData.address
            });

            const updatedUser = response.user;
            localStorage.setItem('khanhcms_user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setLoggedInUser(updatedUser);

            setMessage('Cập nhật thông tin thành công!');
        } catch (error) {
            setMessage('Lỗi: Cập nhật không thành công.');
        }
    };

    // Logic tính toán phân trang
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <div className="text-center mt-5">Đang tải dữ liệu...</div>;

    return (
        <div className="container py-5">
            <h2 className="text-primary font-weight-bold mb-4">Hồ sơ của tôi</h2>

            <div className="row">
                <div className="col-md-5 mb-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-danger text-white font-weight-bold">
                            <i className="fa-solid fa-user-edit mr-2"></i> Thông tin cá nhân
                        </div>
                        <div className="card-body">
                            {message && <div className="alert alert-info">{message}</div>}
                            <form onSubmit={handleUpdateProfile}>
                                <div className="mb-3">
                                    <label className="form-label font-weight-bold">Email (Không thể đổi)</label>
                                    <input type="text" className="form-control" value={user.email} disabled />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label font-weight-bold">Họ và tên</label>
                                    <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label font-weight-bold">Số điện thoại</label>
                                    <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label font-weight-bold">Địa chỉ giao hàng</label>
                                    <textarea className="form-control" name="address" rows="3" value={formData.address} onChange={handleChange}></textarea>
                                </div>
                                <button type="submit" className="btn btn-warning font-weight-bold w-100">
                                    Cập nhật thông tin
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-7">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-dark text-white font-weight-bold">
                            <i className="fa-solid fa-box-open mr-2"></i> Lịch sử đơn hàng
                        </div>
                        <div className="card-body p-0">
                            {orders.length === 0 ? (
                                <div className="p-4 text-center text-muted">
                                    Bạn chưa có đơn hàng nào.
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-striped mb-0">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>Mã ĐH</th>
                                                <th>Ngày đặt</th>
                                                <th>Tổng tiền</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentOrders.map(order => (
                                                <React.Fragment key={order.id}>
                                                    <tr className="bg-light">
                                                        <td className="font-weight-bold align-middle">#{order.id}</td>
                                                        <td className="align-middle">{new Date(order.orderDate).toLocaleString('vi-VN')}</td>
                                                        <td className="text-danger font-weight-bold align-middle">
                                                            {order.totalAmount.toLocaleString('vi-VN')} đ
                                                        </td>
                                                        <td className="align-middle">
                                                            {order.status === 0 && <span className="badge badge-warning">Chờ xử lý</span>}
                                                            {order.status === 1 && <span className="badge badge-info">Đang giao</span>}
                                                            {order.status === 2 && <span className="badge badge-success">Hoàn thành</span>}
                                                            {order.status === 3 && <span className="badge badge-danger">Đã hủy</span>}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="4" className="border-0 pb-4 pt-2 px-4">
                                                            <div className="d-flex flex-column" style={{ gap: '10px' }}>
                                                                {order.items && order.items.map((item, idx) => {
                                                                    const imgUrl = item.imageUrl ? (item.imageUrl.startsWith('http') ? item.imageUrl : `https://localhost:7195${item.imageUrl.startsWith('/') ? '' : '/'}${item.imageUrl}`) : 'https://via.placeholder.com/50?text=No+Image';
                                                                    return (
                                                                        <div key={idx} className="d-flex align-items-center p-2 rounded shadow-sm bg-white" style={{ border: '1px solid #f0f0f0' }}>
                                                                            <img src={imgUrl} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} className="mr-3" onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=Error'; }} />
                                                                            <div className="flex-grow-1">
                                                                                <div className="font-weight-bold text-dark" style={{ fontSize: '0.9rem' }}>{item.name}</div>
                                                                                <div className="text-muted small">Số lượng: x{item.quantity}</div>
                                                                            </div>
                                                                            <div className="text-danger font-weight-bold ml-3" style={{ fontSize: '0.9rem' }}>
                                                                                {(item.quantity * item.unitPrice).toLocaleString('vi-VN')} đ
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                    {/* Pagination Controls */}
                                    {totalPages > 1 && (
                                        <div className="d-flex justify-content-center mt-3 mb-2">
                                            <nav aria-label="Page navigation">
                                                <ul className="pagination pagination-sm mb-0">
                                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>
                                                    </li>
                                                    {[...Array(totalPages)].map((_, i) => (
                                                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                            <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                                                {i + 1}
                                                            </button>
                                                        </li>
                                                    ))}
                                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
