import axiosClient from './api';

const orderService = {
    // Gọi API để lưu đơn hàng
    createOrder: (orderData) => {
        return axiosClient.post('/Orders', orderData);
    },
    // Lấy danh sách lịch sử đơn hàng của khách hàng
    getCustomerOrders: (customerId) => {
        return axiosClient.get(`/Orders/customer/${customerId}`);
    }
};

export default orderService;
