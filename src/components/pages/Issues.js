import { ResultsData } from "../../context/ResultsContext";
import removeSpecialCharacters from "../../helpers/removeSpecialCharacters";

export default function Issues() {
  const { results } = ResultsData();
  return (
    <div className="issues">
      {results.items?.map((item) => (
        <div key={item.node_id} className="item">
          <span>
            <a href={item.html_url}>{item.title}</a>
          </span>
          <p>{removeSpecialCharacters(item.body)}</p>
          {item.labels?.map((label) => {
            <p>{label.name}</p>;
          })}
          <p>
            <a href={item.assignee?.html_url}>{item.assignee?.login} </a>
            Opened on {item.created_at?.split("T")[0]}
          </p>
        </div>
      ))}
    </div>
  );
}
