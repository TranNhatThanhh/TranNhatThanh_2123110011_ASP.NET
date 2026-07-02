// Họ và tên: Đồng Phúc Khánh - MSSV: 2123110051
import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import authService from '../../services/authService';

const LoginPage = () => {
    const navigate = useNavigate();
    const { setLoggedInUser } = useOutletContext() || {};
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await authService.login(email, password);

            // In hẳn toàn bộ response ra để xem cấu trúc thực tế
            console.log("Dữ liệu phản hồi từ service:", response);

            // Nếu authService trả về thẳng data (object), gán thẳng response. 
            // Nếu trả về AxiosResponse gốc, lấy response.data. Thử cả 2 trường hợp an toàn:
            const userData = response?.data || response;

            // Kiểm tra xem userData có phải object hợp lệ và có thuộc tính định danh không (ví dụ: id hoặc email)
            if (userData && (userData.id || userData.email || userData.token)) {

                localStorage.setItem(
                    "thanhcms_user",
                    JSON.stringify(userData)
                );

                if (setLoggedInUser) {
                    setLoggedInUser(userData);
                }

                navigate("/");
            } else {
                // Trường hợp nhận được một object rỗng hoặc giá trị không mong muốn
                setError("Đăng nhập thất bại: Phản hồi từ server không chứa thông tin user!");
            }

        } catch (err) {
            console.log("Lỗi catch được:", err);

            setError(
                err.response?.data?.message ||
                "Sai email hoặc mật khẩu!"
            );
        }
    };

    return (
        <div className="container my-5 py-5">
            <div className="row justify-content-center">
                <div className="col-md-5 bg-white p-4 shadow-lg border rounded">
                    <div className="auth-form p-3">
                        <h4 className="text-center font-weight-bold text-dark mb-4">ĐĂNG NHẬP</h4>
                        {error && <div className="alert alert-danger py-2">{error}</div>}
                        <form onSubmit={handleLogin}>
                            <div className="form-group mb-3">
                                <label className="small font-weight-bold">EMAIL</label>
                                <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <label className="small font-weight-bold mb-0">MẬT KHẨU</label>
                                    <span className="small text-danger cursor-pointer" onClick={() => navigate('/forgot-password')} style={{ cursor: 'pointer' }}>Quên mật khẩu?</span>
                                </div>
                                <input type="password" className="form-control" required value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-danger btn-block font-weight-bold py-2">ĐĂNG NHẬP</button>
                        </form>
                        <div className="text-center mt-3 small">
                            Chưa có tài khoản? <span className="text-danger font-weight-bold cursor-pointer" onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>Đăng ký ngay</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;