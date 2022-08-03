export default function Pagination({
  page,
  ChangePage,
  SelectItemsPerPage,
  maxPages,
}) {
  return (
    <div className="pagination">
      <ul onClick={ChangePage}>
        <li data-page={page - 1}>Previous</li>
        <li>{page}</li>
        <li data-page={page + 1}>{page + 1}</li>
        <li data-page={page + 2}>{page + 2}</li>
        <li data-page={page + 3}>{page + 3}</li>
        <li data-page={maxPages - 1}>{maxPages - 1}</li>
        <li data-page={maxPages}>{maxPages}</li>
        <li data-page={page + 1}>Next</li>
      </ul>

      <select name="itemsPerPage" onClick={SelectItemsPerPage}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  );
}
