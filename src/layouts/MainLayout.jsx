import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const MainLayout = () => {
    // Đọc thông tin user từ localStorage, kiểm tra kỹ để tránh chuỗi "undefined" gây lỗi
    const [loggedInUser, setLoggedInUser] = useState(() => {
        const savedUser = localStorage.getItem('thanhcms_user');
        return savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
    });

    return (
        <div className="App bg-light min-vh-100 d-flex flex-column">
            <Header loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />

            {/* Vùng chứa nội dung các trang (Pages) được cấu hình trong Router */}
            <main className="flex-grow-1">
                <Outlet context={{ setLoggedInUser }} />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;