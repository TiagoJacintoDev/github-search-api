import { RiGitRepositoryLine } from 'react-icons/ri';
import { FiStar } from 'react-icons/fi';
import { BsFillCircleFill } from 'react-icons/bs';
import parseRegex from '../../parseRegex';

export default function Repository({ data }) {
  return (
    <div className="repository">
      {data.items?.map(item => (
        <div key={item.node_id} className="item">
          <a href={item.html_url}>
            <span>
              <RiGitRepositoryLine color="black" />
              {item.full_name}
            </span>
          </a>
          <p>{parseRegex(item.description)}</p>
          <ul className="item-topics">
            {item.topics?.map(topic => (
              <li>{topic}</li>
            ))}
          </ul>
          <div className="item-info">
            <span>
              <FiStar />
              {item.stargazers_count}
            </span>
            <span>
              <BsFillCircleFill />
              {item.language}
            </span>
            <span>Updated on {item.pushed_at?.split('T')[0]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
