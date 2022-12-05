import { QueryData } from "../../context/QueryContext";

export default function QuerySettings() {
  const { query, queryType, queryLanguage } = QueryData();
  return (
    <aside>
      <ul onClick={queryType}>
        <li data-current={query.type === "repositories"}>Repositories</li>
        <li data-current={query.type === "commits"}>Commits</li>
        <li data-current={query.type === "issues"}>Issues</li>
      </ul>
      <h3>Languages</h3>
      <ul onClick={queryLanguage}>
        <li>JavaScript</li>
        <li>Java</li>
        <li>HTML</li>
        <li>Python</li>
      </ul>
    </aside>
  );
}
