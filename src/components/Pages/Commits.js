export default function Commits({ data }) {
  return (
    <div className='commits'>
      {data.items?.map(item => (
        <div key={item.node_id} className='item'>
          <a
            id='fullName'
            href={`https://github.com/${item.repository?.full_name}`}
          >
            {item.repository?.full_name}
          </a>
          <a href={item.html_url}>{item.commit?.message}</a>
          <p>
            <strong>{item.commit?.author?.name}</strong>{' '}
            committed on{' '}
            {item.commit?.author?.date.split('T')[0]}
          </p>
          <a href={item.html_url}>{item.sha?.slice(0, 7)}</a>
          <hr />
        </div>
      ))}
    </div>
  );
}
