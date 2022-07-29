import './App.css';
import { Octokit } from '@octokit/core';
import { useEffect, useState } from 'react';
import SearchBar from './components/Elements/SearchBar';
import DisplayResults from './components/Pages/DisplayResults';
import Footer from './components/Elements/Footer';
import QuerySettings from './components/Elements/QuerySettings';
import SortOptionsMenu from './components/Elements/SortOptionsMenu';

export default function App() {
  const key = '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';
  const octokit = new Octokit({ auth: key });

  const [data, setData] = useState(null);
  const [query, setQuery] = useState({
    type: 'repositories',
    text: '',
    language: '',
    sort: '',
    order: '',
  });

  console.log(query);

  const request = async () => {
    const res = await octokit.request(
      `GET /search/${query.type}?q=${query.text}+language%3A${query.language}&sort=${query.sort}&order=${query.order}`,
      {}
    );
    const data = await res.data;
    setData(data);
  };

  useEffect(() => {
    query.text && request();
  }, [query]);

  function queryText(e) {
    e.preventDefault();
    setQuery(oldQuery => ({
      ...oldQuery,
      text: e.target.value,
    }));
  }

  function sortOptions(e) {
    e.target.firstChild.childNodes.forEach(option => {
      if (option.value === e.target.value) {
        setQuery(oldQuery => ({
          ...oldQuery,
          sort: option.dataset.sort,
          order: option.dataset.order,
        }));
      }
    });
  }

  function queryText(e) {
    e.preventDefault();
    setQuery(oldQuery => ({
      ...oldQuery,
      text: e.target.firstChild.value,
    }));
  }

  function queryLanguage(e) {
    setQuery(oldQuery => ({
      ...oldQuery,
      language: e.target.innerText,
    }));
  }

  function queryType(e) {
    setQuery(oldQuery => ({
      ...oldQuery,
      type: e.target.innerText.toLowerCase(),
    }));
  }

  return (
    <div className='container'>
      <SearchBar QueryText={e => queryText(e)} data={data} />

      {data !== null && (
        <>
          <SortOptionsMenu SortOptions={e => sortOptions(e)} />
          <QuerySettings
            QueryLanguage={e => queryLanguage(e)}
            QueryType={e => queryType(e)}
          />
          <DisplayResults
            data={data}
            typeOfQuery={query.type}
            SortOptions={e => sortOptions(e)}
            QueryLanguage={e => queryLanguage(e)}
            QueryType={e => queryType(e)}
          />
        </>
      )}
      <Footer />
    </div>
  );
}
