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
        <li data-page={page - 1} className="previous">
          <MdOutlineKeyboardArrowLeft color="black" /> Previous
        </li>
        <li className="current">{page}</li>
        <li data-page={page + 1}>{page + 1}</li>
        <li data-page={page + 2}>{page + 2}</li>
        <li data-page={page + 3}>{page + 3}</li>
        <li data-page={maxPages - 1}>{maxPages - 1}</li>
        <li data-page={maxPages}>{maxPages}</li>
        <li data-page={page + 1} className="next">
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
