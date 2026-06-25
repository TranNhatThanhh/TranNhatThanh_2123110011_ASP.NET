import React from 'react';

function LoadingOrEmpty({ loading }) {
    return (
        <div className="text-center py-5 border bg-white rounded-3">
            {loading ? (
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Đang tải dữ liệu...</span>
                </div>
            ) : (
                <div>
                    <h5 className="text-muted">Không tìm thấy phụ kiện máy tính nào phù hợp với bộ lọc.</h5>
                </div>
            )}
        </div>
    );
}

export default LoadingOrEmpty;