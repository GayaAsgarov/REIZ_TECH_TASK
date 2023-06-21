import React from "react";
import "./../assets/style/pagination.css";

const Pagination = ({
  totalCountries,
  countriesPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page == currentPage ? "active" : ""}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
