export default function QuerySettings({ QueryLanguage, QueryType }) {
  return (
    <aside>
      <ul onClick={QueryType}>
        <li>Repositories</li>
        <li>Code</li>
        <li>Commits</li>
        <li>Issues</li>
      </ul>
      <ul onClick={QueryLanguage}>
        <h3>Languages</h3>
        <li>JavaScript</li>
        <li>Java</li>
        <li>HTML</li>
        <li>Python</li>
      </ul>
    </aside>
  );
}
