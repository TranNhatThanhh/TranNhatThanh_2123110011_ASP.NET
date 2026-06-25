import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Gửi trực tiếp Object thuần tuý trùng khớp với Backend AccountController
            const response = await axios.post('https://localhost:7195/api/account/login', {
                username: username,
                password: password
            });
            
            // Chấp nhận cả Token viết hoa lẫn viết thường từ API trả về
            const token = response.data?.token || response.data?.Token;
            if (token) {
                localStorage.setItem('token', token);
                alert('Đăng nhập thành công! 🎉');
                window.location.href = '/'; 
            }
        } catch (err) {
            console.error("Chi tiết lỗi đăng nhập:", err);
            alert(err.response?.data?.message || 'Tài khoản hoặc mật khẩu không đúng!');
        }
    };

    return (
        <div className="container my-5 d-flex justify-content-center">
            <form onSubmit={handleLogin} className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px', borderRadius: '12px' }}>
                <h3 className="text-center mb-4 fw-bold">🔐 ĐĂNG NHẬP</h3>
                <div className="mb-3">
                    <label className="form-label fw-bold small text-secondary">Tài khoản</label>
                    <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} placeholder="Nhập tài khoản (Ví dụ: ThanhAbc)..." />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold small text-secondary">Mật khẩu</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="Nhập mật khẩu..." />
                </div>
                <button type="submit" className="btn btn-danger w-100 fw-bold py-2 mt-2">ĐĂNG NHẬP NGAY</button>
            </form>
        </div>
    );
}

export default Login;