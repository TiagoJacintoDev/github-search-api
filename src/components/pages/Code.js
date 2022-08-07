import parseRegex from '../../parseRegex';

export default function Code({ data }) {
  return (
    <div className="code">
      {data.items?.map(item => (
        <div key={item.node_id} className="item">
          <div className="profile">
            <img src={item.repository?.owner?.avatar_url}></img>
            <a href={item.repository?.html_url}>{item.repository?.full_name}</a>
          </div>

          <p>
            <a href={item.html_url}>{item.path}</a>
          </p>
          <p>{parseRegex(item.repository?.description)}</p>
        </div>
      ))}
    </div>
  );
}
