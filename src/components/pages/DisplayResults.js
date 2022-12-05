import Repository from "./Repository";
import Issues from "./Issues";
import Commits from "./Commits";
import SortOptionsMenu from "../elements/SortOptionsMenu";
import { QueryData } from "../../context/QueryContext";
import { ResultsData } from "../../context/ResultsContext";

export default function DisplayResults() {
  const { query } = QueryData();
  const { results, isLoading } = ResultsData();

  function queryType() {
    switch (query.type) {
      case "repositories":
        return "repository";
      case "code":
        return "code";
      case "commits":
        return "commit";
      case "issues":
        return "issues";
    }
  }

  return (
    <>
      <main>
        <div className="results">
          <h2 className="results-number">
            {results.total_count || "0"} {queryType()} results
          </h2>
          <SortOptionsMenu />
        </div>
        {!isLoading && (
          <>
            {query.type === "repositories" && <Repository />}
            {query.type === "commits" && <Commits />}
            {query.type === "issues" && <Issues />}
          </>
        )}
      </main>
    </>
  );
}
