import { ResultsData } from "../../context/ResultsContext";
import removeSpecialCharacters from "../../helpers/removeSpecialCharacters";

export default function Commits() {
  const { results } = ResultsData();
  return (
    <div className="commits">
      {results.items?.map((item) => (
        <div key={item.node_id} className="item">
          <span>
            <a
              id="fullName"
              href={`https://github.com/${item.repository?.full_name}`}
              className="profile"
            >
              {item.repository?.full_name}
            </a>
          </span>
          <a href={item.html_url}>
            {removeSpecialCharacters(item.commit?.message)}
          </a>
          <span>
            <a className="profile" href={item.author?.html_url}>
              {item.commit?.author?.name}
            </a>
            committed on {item.commit?.author?.date.split("T")[0]}
          </span>
          <span>
            <a href={item.html_url}>{item.sha?.slice(0, 7)}</a>
          </span>
        </div>
      ))}
    </div>
  );
}
