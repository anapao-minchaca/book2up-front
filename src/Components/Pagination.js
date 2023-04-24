/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Pagination.css";

const Pagination = ({ postPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <ul>
        {pageNumbers.map((number) => {
          return (
            <a
              key={number}
              className={currentPage - 1 === number ? "active" : ""}
              onClick={() => {
                paginate(number + 1);
              }}
            >
              <li>{number + 1}</li>
            </a>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
