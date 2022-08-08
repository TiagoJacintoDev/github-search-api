import Repository from './Repository';
import Code from './Code';
import Issues from './Issues';
import Commits from './Commits';
import SortOptionsMenu from '../elements/SortOptionsMenu';

export default function DisplayResults({ data, typeOfQuery, SortOptions }) {
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
        <div className="results">
          <h2 className="results-number">
            {data.total_count || '0'} {name()} results
          </h2>
          <SortOptionsMenu SortOptions={SortOptions} />
        </div>
        {typeOfQuery === 'repositories' && <Repository data={data} />}
        {typeOfQuery === 'code' && <Code data={data} />}
        {typeOfQuery === 'commits' && <Commits data={data} />}
        {typeOfQuery === 'issues' && <Issues data={data} />}
      </main>
    </>
  );
}
