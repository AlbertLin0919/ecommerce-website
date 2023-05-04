import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ pagination, changePage, category }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <Link
            aria-label="Previous"
            className={`page-link ${!pagination.has_pre && "disabled"}`}
            onClick={(e) => {
              e.preventDefault();
              changePage(pagination.current_page - 1, category);
            }}
          >
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>
        {[...new Array(pagination.total_pages)].map((_, i) => (
          <li className="page-item" key={`${i}_page`}>
            <Link
              className={`page-link ${
                i + 1 === pagination.current_page && "active"
              }`}
              onClick={(e) => {
                e.preventDefault();
                changePage(i + 1, category);
              }}
            >
              {i + 1}
            </Link>
          </li>
        ))}
        <li className="page-item">
          <Link
            aria-label="Next"
            className={`page-link ${!pagination.has_next && "disabled"}`}
            onClick={(e) => {
              e.preventDefault();
              changePage(pagination.current_page + 1, category);
            }}
          >
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
