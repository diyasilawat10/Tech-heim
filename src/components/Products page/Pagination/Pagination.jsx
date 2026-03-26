import "./Pagination.css";

const Pagination = ({ totalPages = 5, currentPage = 1, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages) return;
    if (onPageChange) onPageChange(page);
  };

  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <div
          key={page}
          className={`page-item ${currentPage === page ? "active" : ""}`}
          onClick={() => handlePageClick(page)}
        >
          <span className="page-text">{page}</span>
        </div>
      ))}
      <div
        className={`page-arrow ${currentPage >= totalPages ? "disabled" : ""}`}
        onClick={() => handlePageClick(currentPage + 1)}
        role="button"
        aria-label="Next page"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.26 5.59998L19.6601 12L13.26 18.4" stroke="#0C0C0C" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.34009 12H19.4701" stroke="#0C0C0C" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

export default Pagination;
