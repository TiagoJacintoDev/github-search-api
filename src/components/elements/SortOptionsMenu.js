import { QueryData } from "../../context/QueryContext";
import { sortOptions } from "../../data/sortOptions";

export default function SortOptionsMenu() {
  const { sortResults } = QueryData();
  return (
    <select
      className="sort-options-menu"
      name="sortOptions"
      onChange={sortResults}
    >
      <optgroup label="Sort options">
        {sortOptions.map((option) => (
          <option key={option.id} value={`${option.order} ${option.sort}`}>
            {option.name}
          </option>
        ))}
      </optgroup>
    </select>
  );
}
