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
          <h2 style={{ marginBottom: "15px" }}>
            Search for projects available on GitHub
          </h2>
          <h3>Suggestions: </h3>
          <ul style={{ marginBlock: "15px", marginLeft: "17px" }}>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => searchFor("React")}
            >
              <a>React</a>
            </li>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => searchFor("TypeScript")}
            >
              <a>TypeScript</a>
            </li>
            <li style={{ cursor: "pointer" }} onClick={() => searchFor("Jest")}>
              <a>Jest</a>
            </li>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => searchFor("Tailwind CSS")}
            >
              <a>Tailwind CSS</a>
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
