export default function QuerySettings({
  QueryType,
  QueryLanguage,
  typeOfQuery,
}) {
  return (
    <aside>
      <ul onClick={QueryType}>
        <li data-current={typeOfQuery === 'repositories'}>Repositories</li>
        <li data-current={typeOfQuery === 'commits'}>Commits</li>
        <li data-current={typeOfQuery === 'issues'}>Issues</li>
      </ul>
      <h3>Languages</h3>
      <ul onClick={QueryLanguage}>
        <li>JavaScript</li>
        <li>Java</li>
        <li>HTML</li>
        <li>Python</li>
      </ul>
    </aside>
  );
}
