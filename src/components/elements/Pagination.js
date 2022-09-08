import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination({ itemsPerPage, items, ChangePage }) {
  const [pageCount, setPageCount] = useState(0);
  const [pageRange, setPageRange] = useState(0);

  useEffect(() => handlePageRange(), []);

  useEffect(() => {
    setPageCount(
      Math.ceil(items >= 1000 ? 1000 / itemsPerPage : items / itemsPerPage)
    );
  }, [itemsPerPage, items]);

  const handlePageClick = event => {
    ChangePage(event.selected + 1);
  };

  function handlePageRange() {
    if (window.innerWidth > 850) {
      setPageRange(5);
    } else {
      setPageRange(0);
    }
  }

  window.addEventListener('resize', handlePageRange);

  return (
    <div className='pagination'>
      <ReactPaginate
        className='pagination-list'
        breakLabel='...'
        nextLabel='next >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageRange}
        pageCount={pageCount}
        previousLabel='< previous'
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
