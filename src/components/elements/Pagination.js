import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination({ itemsPerPage, items, ChangePage }) {
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setPageCount(
      Math.ceil(items >= 1000 ? 1000 / itemsPerPage : items / itemsPerPage)
    );
  }, [itemsPerPage, items]);

  const handlePageClick = event => {
    ChangePage(event.selected + 1);
  };

  return (
    <div className="pagination pagination-pages">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
