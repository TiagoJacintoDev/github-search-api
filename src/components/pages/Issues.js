import parseRegex from '../../parseRegex';

export default function Issues({ data }) {
  return (
    <div className="issues">
      {data.items?.map(item => (
        <div key={item.node_id} className="item">
          <span>
            <a href={item.html_url}>{item.title}</a>
          </span>
          <p>{parseRegex(item.body)}</p>
          {item.labels?.map(label => {
            <p>{label.name}</p>;
          })}
          <p>
            <a href={item.assignee?.html_url}>{item.assignee?.login} </a>
            Opened on {item.created_at?.split('T')[0]}
          </p>
        </div>
      ))}
    </div>
  );
}
