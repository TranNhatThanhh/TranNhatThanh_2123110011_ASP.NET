// Chức năng: Service gọi API Banner từ Backend
import axiosClient from './api';

const bannerService = {
    // Lấy danh sách banner đang kích hoạt
    getAllBanners: () => {
        return axiosClient.get('/banners');
    }
};

export default bannerService;
