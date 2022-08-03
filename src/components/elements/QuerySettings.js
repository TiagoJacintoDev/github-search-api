export default function QuerySettings({ QueryLanguage, QueryType }) {
  return (
    <aside>
      <ul onClick={QueryType}>
        <li>Repositories</li>
        <li>Code</li>
        <li>Commits</li>
        <li>Issues</li>
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
