import { useState } from "react";
import { QueryData } from "../../context/QueryContext";
import { ResultsData } from "../../context/ResultsContext";

export default function SearchBar() {
  const { queryText } = QueryData();
  const { results } = ResultsData();
  const [inputValue, setInputValue] = useState("");

  const searchFor = (value) => {
    setInputValue(value);
    queryText(value);
  };

  return (
    <header>
      {!results && (
        <>
          <h2 className="search-bar-heading">
            Search for projects available on GitHub
          </h2>
          <h3>Suggestions: </h3>
          <ul className="search-bar-suggestions-list">
            <li>
              <a
                className="search-bar-suggestion"
                onClick={() => searchFor("React")}
              >
                React
              </a>
            </li>
            <li>
              <a
                className="search-bar-suggestion"
                onClick={() => searchFor("TypeScript")}
              >
                TypeScript
              </a>
            </li>
            <li>
              <a
                className="search-bar-suggestion"
                onClick={() => searchFor("Jest")}
              >
                Jest
              </a>
            </li>
            <li>
              <a
                className="search-bar-suggestion"
                onClick={() => searchFor("Tailwind CSS")}
              >
                Tailwind CSS
              </a>
            </li>
          </ul>
        </>
      )}
      <form
        className="search-bar"
        onSubmit={(e) => {
          e.preventDefault();
          queryText(inputValue);
        }}
      >
        <input
          placeholder="Searh in GitHub"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="search-input"
          type="text"
        />
        <button className="button">Search</button>
      </form>
    </header>
  );
}
