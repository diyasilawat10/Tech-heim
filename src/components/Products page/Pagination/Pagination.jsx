import { useState } from "react";
import "./Pagination.css";

const Pagination = ({ totalPages = 5, initialPage = 4, onPageChange }) => {
  const [activePage, setActivePage] = useState(initialPage);

  const handlePageClick = (page) => {
    setActivePage(page);
    if (onPageChange) onPageChange(page);
  };

  const pages = [1, 2, 3, 4, "..."];

  return (
    <div className="pagination">
      {pages.map((page, index) => (
        <div
          key={index}
          className={`page-item ${activePage === page ? "active" : ""}`}
          onClick={() => typeof page === "number" && handlePageClick(page)}
        >
          <span className="page-text">{page}</span>
        </div>
      ))}
      <div className="page-arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.26 5.59998L19.6601 12L13.26 18.4" stroke="#0C0C0C" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.34009 12H19.4701" stroke="#0C0C0C" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

export default Pagination;
