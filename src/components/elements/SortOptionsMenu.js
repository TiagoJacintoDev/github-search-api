export default function SortOptionsMenu({ SortOptions }) {
  return (
    <select
      className="sort-options-menu"
      name="sortOptions"
      onClick={SortOptions}
    >
      <optgroup label="Sort options">
        <option data-order="desc" data-sort="" value="bestMatch">
          Best match
        </option>
        <option data-order="desc" data-sort="stars" value="mostStars">
          Most Stars
        </option>
        <option data-order="asc" data-sort="stars" value="fewestStars">
          Fewest stars
        </option>
        <option data-order="desc" data-sort="forks" value="mostForks">
          Most forks
        </option>
        <option data-order="asc" data-sort="forks" value="fewestForks">
          Fewest forks
        </option>
        <option data-order="desc" data-sort="updated" value="recentlyUpdated">
          Recently updated
        </option>
        <option
          data-order="asc"
          data-sort="updated"
          value="leastRecentlyUpdated"
        >
          Least recently updated
        </option>
      </optgroup>
    </select>
  );
}
