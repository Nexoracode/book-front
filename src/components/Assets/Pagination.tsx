import React from "react";
import { ExpandLeftDouble } from "../Icons/ExpandLeftDouble";
import { ExpandLeft } from "../Icons/ExpandLeft";
import { ExpandRight } from "../Icons/ExpandRight";
import { ExpandRightDouble } from "../Icons/ExpandRightDouble";
interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPageNumbers = 5;

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const lastPages = Math.max(totalPages - 2, 1);

    if (totalPages <= maxPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      pages.push(1, 2, 3, "...", lastPages, totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", lastPages - 1, lastPages, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* دکمه رفتن به اولین صفحه */}
      <button
        className={`pagination-btn ${currentPage === 1 ? "pagination-disabled" : ""}`}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <ExpandRightDouble />
      </button>

      {/* دکمه صفحه قبل */}
      <button
        className={`pagination-btn ${currentPage === 1 ? "pagination-disabled" : ""}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ExpandRight />
      </button>

      {/* شماره صفحات */}
      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-1 text-gray-500">...</span>
        ) : (
          <button
            key={page}
            className={`pagination-number ${currentPage === page ? "pagination-active" : ""}`}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </button>
        )
      )}

      {/* دکمه صفحه بعد */}
      <button
        className={`pagination-btn ${currentPage === totalPages ? "pagination-disabled" : ""}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ExpandLeft />
      </button>

      {/* دکمه رفتن به آخرین صفحه */}
      <button
        className={`pagination-btn ${currentPage === totalPages ? "pagination-disabled" : ""}`}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <ExpandLeftDouble />
      </button>
    </div>
  );
};

export default Pagination;
