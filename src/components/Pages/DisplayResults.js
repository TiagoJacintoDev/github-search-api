import Repository from './Repository';
import Code from './Code';
import Issues from './Issues';
import Commits from './Commits';

export default function DisplayResults({ data, typeOfQuery }) {
  function name() {
    switch (typeOfQuery) {
      case 'repositories':
        return 'repository';
      case 'code':
        return 'code';
      case 'commits':
        return 'commit';
      case 'issues':
        return 'issues';
    }
  }
  return (
    <>
      <main>
        <div className='results'>
          <h2>
            {data.total_count || '0'} {name()} results
          </h2>
        </div>

        {typeOfQuery === 'repositories' && <Repository data={data} />}
        {typeOfQuery === 'code' && <Code data={data} />}
        {typeOfQuery === 'commits' && <Commits data={data} />}
        {typeOfQuery === 'issues' && <Issues data={data} />}
      </main>
    </>
  );
}
