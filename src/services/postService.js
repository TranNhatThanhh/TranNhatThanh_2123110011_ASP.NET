// Import c?u hình axiosClient dùng chung ?ã ???c c?u hình BaseURL ? th? m?c api
import axiosClient from '../api/axiosClient';


const postService = {
    /**
     * 1. L?y danh sách toàn b? bài vi?t tin t?c t? Backend
     * API Endpoint: GET https://localhost:xxxx/api/Posts (ho?c /api/Blogs tùy c?u hình Backend)
     */
    getAllPosts: async () => {
        try {
            // Th?c hi?n g?i API GET qua axiosClient
            const response = await axiosClient.get('/Posts');


            // Tr? v? d? li?u m?ng bài vi?t (th??ng n?m trong response.data ho?c tr?c ti?p response tùy c?u hình client)
            return response.data || response;
        } catch (error) {
            console.error("L?i API getAllBlogs:", error);
            throw error; // ??y l?i ra ngoài ?? Component nh?n bi?t và x? lý UI (nh? t?t loading, hi?n thông báo l?i)
        }
    },


    /**
     * 2. L?y thông tin chi ti?t c?a m?t bài vi?t theo ID
     * API Endpoint: GET https://localhost:xxxx/api/Posts/{id}
     */
    getPostById: async (id) => {
        try {
            const response = await axiosClient.get(`/Posts/${id}`);
            return response.data || response;
        } catch (error) {
            console.error(`L?i API getBlogById v?i ID ${id}:`, error);
            throw error;
        }
    }
};


// B?T BU?C: Xu?t m?c ??nh ?? file LatestBlog.jsx có th? import tr?c ti?p không b? l?i
export default postService;
