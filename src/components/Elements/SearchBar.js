export default function SearchBar({ QueryText }) {
  return (
    <header>
      <h2>Search in GitHub</h2>
      <form onSubmit={QueryText}>
        <input type='text' size='28' />
        <button className='button'>Search</button>
      </form>
    </header>
  );
}
