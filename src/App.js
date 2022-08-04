import './App.css';
import { Octokit } from '@octokit/core';
import { useEffect, useMemo, useState } from 'react';
import SearchBar from './components/elements/SearchBar';
import DisplayResults from './components/pages/DisplayResults';
import Footer from './components/elements/Footer';
import QuerySettings from './components/elements/QuerySettings';
import Pagination from './components/elements/Pagination';

export default function App() {
  const key = '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';
  const octokit = new Octokit({ auth: key });

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState({
    type: 'repositories',
    text: '',
    language: '',
    sort: '',
    order: '',
    page: 1,
    itemsPerPage: '10',
  });

  const maxPages = useMemo(
    () => 1000 / query.itemsPerPage,
    [query.itemsPerPage]
  );

  const fetch = async () => {
    const res = await octokit.request(
      `GET /search/${query.type}?q=${query.text}+language%3A${query.language}&sort=${query.sort}&order=${query.order}&page=${query.page}&per_page=${query.itemsPerPage}`,
      {}
    );
    const error = await res.status;
    const data = await res.data;
    setData(data);
    setError(error);
  };

  useEffect(() => {
    query.text && fetch();
  }, [query]);

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

  function changePage(e) {
    setQuery(oldQuery => ({
      ...oldQuery,
      page:
        +e.target.dataset.page > 0 && +e.target.dataset.page <= maxPages
          ? +e.target.dataset.page
          : query.page,
    }));
  }

  function selectItemsPerPage(e) {
    setQuery(oldQuery => ({
      ...oldQuery,
      itemsPerPage: e.target.value,
    }));
  }

  return (
    <div className="container">
      <SearchBar data={data} QueryText={e => queryText(e)} />
      {data && (
        <>
          <div className="search-info">
            <QuerySettings
              QueryLanguage={e => queryLanguage(e)}
              QueryType={e => queryType(e)}
            />
            <DisplayResults
              SortOptions={e => sortOptions(e)}
              data={data}
              typeOfQuery={query.type}
            />
          </div>
          <Pagination
            page={query.page}
            maxPages={maxPages}
            ChangePage={e => changePage(e)}
            SelectItemsPerPage={e => selectItemsPerPage(e)}
          />
          <Footer />
        </>
      )}
    </div>
  );
}
