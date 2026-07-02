import axios from 'axios';

// Đọc URL từ file .env thay vì hardcode - chuẩn cấu trúc doanh nghiệp
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://localhost:7195/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.error('Lỗi kết nối API:', error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;
