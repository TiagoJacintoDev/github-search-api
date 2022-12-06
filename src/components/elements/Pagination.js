import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { QueryData } from "../../context/QueryContext";
import { ResultsData } from "../../context/ResultsContext";

export default function Pagination() {
  const { query, changePage } = QueryData();
  const { results } = ResultsData();

  const [pageCount, setPageCount] = useState(0);
  const [pageRange, setPageRange] = useState(0);

  useEffect(() => {
    setPageCount(
      Math.ceil(
        results.total_count >= 1000
          ? 1000 / query.itemsPerPage
          : results.total_count / query.itemsPerPage
      )
    );
  }, [query.itemsPerPage, results.total_count]);

  useEffect(() => {
    handlePageRange();
    window.addEventListener("resize", handlePageRange);

    return function cleanup() {
      window.removeEventListener("resize", handlePageRange);
    };
  }, []);

  const handlePageClick = (event) => {
    changePage(event.selected + 1);
  };

  function handlePageRange() {
    if (window.innerWidth > 1000) {
      setPageRange(5);
    } else {
      setPageRange(0);
    }
  }

  return (
    <div className="pagination">
      <ReactPaginate
        className="pagination-list"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageRange}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
