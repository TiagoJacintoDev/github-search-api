import { RiGitRepositoryLine } from 'react-icons/ri';
import { FiStar } from 'react-icons/fi';
import { BsFillCircleFill } from 'react-icons/bs';

export default function Repository({ data }) {
  return (
    <div className='repository'>
      {data.items?.map(item => (
        <div key={item.node_id} className='item'>
          <a href={item.html_url}>
            <RiGitRepositoryLine color='black' />
            {item.full_name}
          </a>
          <p>{item.description}</p>
          <ul>
            {item.topics?.map(topic => (
              <li>{topic}</li>
            ))}
          </ul>
          <div className='item-info'>
            <p>
              <FiStar />
              {item.stargazers_count}
            </p>
            <p>
              <BsFillCircleFill />
              {item.language}
            </p>
            <p>Updated on {item.pushed_at?.split('T')[0]}</p>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
