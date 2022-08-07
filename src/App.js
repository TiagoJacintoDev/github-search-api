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
  const [query, setQuery] = useState({
    type: 'repositories',
    text: '',
    languages: [],
    sort: '',
    order: '',
    page: 1,
    itemsPerPage: '10',
  });

  const languages = query.languages.map(language => `+language%3A${language}`);

  const maxPages = useMemo(() => {
    if (data) {
      if (data.total_count >= 1000) {
        return 1000 / query.itemsPerPage;
      } else {
        return Math.ceil(data.total_count / query.itemsPerPage);
      }
    }
  }, [query.itemsPerPage, data]);

  const fetch = async () => {
    const res = await octokit.request(
      `GET /search/${query.type}?q=${query.text}${languages}&sort=${query.sort}&order=${query.order}&page=${query.page}&per_page=${query.itemsPerPage}`,
      {}
    );
    const data = await res.data;
    setData(data);
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
      languages: [...languages, e.target.innerText],
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
