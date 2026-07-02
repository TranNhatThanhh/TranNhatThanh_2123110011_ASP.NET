import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await authService.forgotPassword(email);
            setSuccess(res.message);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!');
        }
        setLoading(false);
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await authService.verifyOtp(email, otp);
            setSuccess(res.message);
            setStep(3);
        } catch (err) {
            setError(err.response?.data?.message || 'Mã OTP không hợp lệ!');
        }
        setLoading(false);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu nhập lại không khớp!');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await authService.resetPassword(email, otp, newPassword);
            setSuccess(res.message);
            // Sau 2 giây chuyển về trang đăng nhập
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Không thể đặt lại mật khẩu!');
        }
        setLoading(false);
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-header bg-danger text-white text-center py-3">
                            <h4 className="mb-0 font-weight-bold">
                                {step === 1 && "QUÊN MẬT KHẨU"}
                                {step === 2 && "XÁC NHẬN MÃ OTP"}
                                {step === 3 && "ĐẶT MẬT KHẨU MỚI"}
                            </h4>
                        </div>
                        <div className="card-body p-4">
                            {error && <div className="alert alert-danger text-center">{error}</div>}
                            {success && <div className="alert alert-success text-center">{success}</div>}

                            {step === 1 && (
                                <form onSubmit={handleSendOtp}>
                                    <p className="text-muted text-center mb-4">Vui lòng nhập địa chỉ email đã đăng ký. Chúng tôi sẽ gửi mã xác thực (OTP) qua email của bạn.</p>
                                    <div className="form-group mb-4">
                                        <label className="font-weight-bold">Email của bạn</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Ví dụ: khanh@gmail.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-danger btn-block font-weight-bold" disabled={loading}>
                                        {loading ? <i className="fas fa-spinner fa-spin"></i> : "GỬI MÃ OTP"}
                                    </button>
                                </form>
                            )}

                            {step === 2 && (
                                <form onSubmit={handleVerifyOtp}>
                                    <p className="text-muted text-center mb-4">Mã OTP gồm 6 chữ số đã được gửi đến email <strong>{email}</strong>. Mã có hiệu lực trong 5 phút.</p>
                                    <div className="form-group mb-4 text-center">
                                        <label className="font-weight-bold">Nhập mã OTP</label>
                                        <input
                                            type="text"
                                            className="form-control text-center font-weight-bold text-danger mx-auto"
                                            style={{ fontSize: '24px', letterSpacing: '5px', width: '200px' }}
                                            maxLength="6"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-danger btn-block font-weight-bold" disabled={loading}>
                                        {loading ? <i className="fas fa-spinner fa-spin"></i> : "XÁC NHẬN OTP"}
                                    </button>
                                </form>
                            )}

                            {step === 3 && (
                                <form onSubmit={handleResetPassword}>
                                    <p className="text-muted text-center mb-4">Mã OTP hợp lệ! Vui lòng đặt mật khẩu mới cho tài khoản của bạn.</p>
                                    <div className="form-group mb-3">
                                        <label className="font-weight-bold">Mật khẩu mới</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            minLength="6"
                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="font-weight-bold">Nhập lại mật khẩu</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            minLength="6"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-danger btn-block font-weight-bold" disabled={loading}>
                                        {loading ? <i className="fas fa-spinner fa-spin"></i> : "ĐỔI MẬT KHẨU"}
                                    </button>
                                </form>
                            )}

                            <div className="text-center mt-4">
                                <Link to="/login" className="text-decoration-none text-danger">
                                    <i className="fa-solid fa-arrow-left mr-1"></i> Quay lại Đăng nhập
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
