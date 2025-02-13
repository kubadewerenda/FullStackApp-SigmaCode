import React from "react";

const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNum = () => {
        if (totalPages < 1) return null;
        
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`page-num ${i === currentPage ? "bg-gray-700 text-white" : "text-red-800"}`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };
    
    return (
        <div className="flex items-center justify-center mt-4 space-x-2">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="page-switch"
                disabled={currentPage === 1}
            >
                &#60;
            </button>

            {renderPageNum()}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="page-switch"
                disabled={currentPage === totalPages}
            >
                &#62;
            </button>
        </div>
    );
};

export default Pagination;