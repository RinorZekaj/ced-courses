import React from "react";

const Pagination = ({ costsPerPage, totalCosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCosts / costsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="nav">
      <ul
        className="ul"
        style={{
          display: "flex",
          justifyContent: "center",
          listStyleType: "none",
          alignItems: "center",
        }}
      >
        {pageNumbers.map((number) => (
          <li
            key={number}
            style={{
              border: "1px solid #00365c",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "35px",
              height: "35px",
              color: "#00365c",
              backgroundColor: "white",
              marginRight: "2px"
            }}
          >
            <a onClick={() => paginate(number)} style={{ cursor: "pointer" }}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
