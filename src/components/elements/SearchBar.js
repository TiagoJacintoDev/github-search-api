export default function SearchBar({ QueryText, data }) {
  return (
    <header>
      {!data && <h2>Search in GitHub</h2>}
      <form className="search-bar" onSubmit={QueryText}>
        <input className="search-input" type="text" />
        <button className="button">Search</button>
      </form>
    </header>
  );
}
