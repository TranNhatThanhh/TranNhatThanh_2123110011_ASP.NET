// Ch?c nãng: Tr?c g?i API Bài vi?t và b? sung Chuyên m?c tin t?c (M? r?ng Bu?i 8)
import axiosClient from './api';

const blogService = {
    // 1. Hàm l?y danh sách toàn b? bài vi?t (Ð? làm ? ph?n th?c hành chung)
    getAllPosts: () => {
        const url = '/Posts';
        return axiosClient.get(url);
    },
    // 2. BÀI T?P T? LÀM: Thêm hàm l?y danh sách Chuyên m?c tin t?c (Category)
    getBlogCategories: () => {
        const url = '/Categories'; // C?n kh?p chính xác v?i [Route("api/Categories")] trong CategoriesController ? Backend
        return axiosClient.get(url);
    },
    getPostsByCategory: (categoryId) => {
        // Lýu ?: S?a l?i URL này n?u Backend c?a b?n ð?nh ngh?a Route khác (VD: /Posts/categorypost/...)
        const url = `/Posts/category/${categoryId}`;
        return axiosClient.get(url);
    },
    getPostById: (id) => {
        const url = `/Posts/${id}`;
        return axiosClient.get(url);
    }
};

export default blogService;
