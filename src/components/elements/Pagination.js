import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

export default function Pagination({
  page,
  ChangePage,
  SelectItemsPerPage,
  maxPages,
}) {
  return (
    <div className="pagination">
      <ul className="pagination-pages" onClick={ChangePage}>
        <li
          data-page={page - 1}
          className="previous"
          data-can-change={page === 1}
        >
          <MdOutlineKeyboardArrowLeft color="black" /> Previous
        </li>
        <li className="current">{page}</li>
        <li data-page={page + 1} id="plus1">
          {page + 1}
        </li>
        <li data-page={page + 2} id="plus2">
          {page + 2}
        </li>
        <li data-page={page + 3} id="plus3">
          {page + 3}
        </li>
        <li data-page={maxPages - 1} id="max-1">
          {maxPages - 1}
        </li>
        <li data-page={maxPages} id="max">
          {maxPages}
        </li>
        <li
          data-page={page + 1}
          className="next"
          data-can-change={maxPages === page}
        >
          Next <MdOutlineKeyboardArrowRight color="black" />
        </li>
      </ul>

      <select
        name="itemsPerPage"
        onClick={SelectItemsPerPage}
        className="sort-options-menu"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  );
}
