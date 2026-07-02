import axiosClient from './api';

const authService = {

    // Đăng ký
    register: (fullName, email, password, phone, address) => {
        return axiosClient.post('/CustomerAuth/register', {
            fullName,
            email,
            password,
            phone,
            address
        });
    },

    // Đăng nhập
    login: (email, password) => {
        return axiosClient.post('/CustomerAuth/login', {
            email,
            password
        });
    }

};

export default authService;