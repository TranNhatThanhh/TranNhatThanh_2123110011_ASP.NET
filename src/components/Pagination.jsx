import React from 'react';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Nếu tổng số sản phẩm ít hơn số lượng quy định trên 1 trang -> Ẩn thanh phân trang luôn
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="my-4 d-flex justify-content-center">
            <ul className="pagination pagination-sm m-0 gap-1 align-items-center">
                {/* Nút TRƯỚC */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link border rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '36px', height: '36px', color: '#198754' }}
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <i className="fa-solid fa-chevron-left text-xs"></i>
                    </button>
                </li>

                {/* Danh sách SỐ TRANG */}
                {pageNumbers.map((number) => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button
                            className="page-link border rounded-circle d-flex align-items-center justify-content-center fw-bold"
                            style={{
                                width: '36px',
                                height: '36px',
                                backgroundColor: currentPage === number ? '#198754' : '#fff',
                                borderColor: currentPage === number ? '#198754' : '#dee2e6',
                                color: currentPage === number ? '#fff' : '#495057',
                                transition: '0.2s'
                            }}
                            onClick={() => onPageChange(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}

                {/* Nút SAU */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link border rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '36px', height: '36px', color: '#198754' }}
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <i className="fa-solid fa-chevron-right text-xs"></i>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;