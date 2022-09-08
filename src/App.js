import './App.css';
import { Octokit } from '@octokit/core';
import { useEffect, useMemo, useState } from 'react';
import SearchBar from './components/elements/SearchBar';
import DisplayResults from './components/pages/DisplayResults';
import Footer from './components/elements/Footer';
import QuerySettings from './components/elements/QuerySettings';
import Pagination from './components/elements/Pagination';
import { debounce } from 'lodash';
import ProgressBar from '@ramonak/react-progress-bar';

export default function App() {
  const key = process.env.REACT_APP_API_KEY;
  const octokit = new Octokit({
    auth: key,
  });

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [query, setQuery] = useState({
    type: 'repositories',
    text: '',
    languages: [],
    sort: '',
    order: '',
    page: 1,
    itemsPerPage: 10,
  });

  const languages = query.languages.map(language => `+language%3A${language}`);

  const fetch = async () => {
    setIsLoading(true);
    const res = await octokit.request(
      `GET /search/${query.type}?q=${query.text}${languages}&sort=${query.sort}&order=${query.order}&page=${query.page}&per_page=${query.itemsPerPage}`,
      {}
    );
    const data = await res.data;
    setData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    query.text && fetch();
    throwError(isLoading);
  }, [
    query?.type,
    query?.text,
    query?.languages,
    query?.sort,
    query?.order,
    query?.page,
    query?.itemsPerPage,
  ]);

  const debouncedFunctions = {
    queryLanguage: useMemo(() => debounce(queryLanguage, 300)),
    queryType: useMemo(() => debounce(queryType, 450)),
    sortOptions: useMemo(() => debounce(sortOptions, 100), []),
    changePage: useMemo(() => debounce(changePage, 100), []),
  };

  function queryText(e) {
    e.preventDefault();
    setQuery(oldQuery => ({
      ...oldQuery,
      text: e.target.firstChild.value,
    }));
  }

  function queryLanguage(e) {
    e.target.toggleAttribute('data-selected');
    setQuery(oldQuery => {
      if (oldQuery.languages.includes(e.target.innerText)) {
        return {
          ...oldQuery,
          languages: oldQuery.languages.filter(
            language => language !== e.target.innerText
          ),
        };
      } else {
        return {
          ...oldQuery,
          languages: [...oldQuery.languages, e.target.innerText],
        };
      }
    });
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

  function changePage(pageNumber) {
    setQuery(oldQuery => ({
      ...oldQuery,
      page: pageNumber,
    }));
  }

  function throwError(isLoading) {
    if (isLoading) {
      setTimeout(() => setError(true), 1000);
    } else {
      setError(false);
    }
  }

  return (
    <>
      {isLoading && (
        <ProgressBar
          className='progress-bar'
          completed={100}
          bgColor='#0969da'
          height='4px'
          borderRadius='0'
          isLabelVisible={false}
          labelColor='#e80909'
          transitionDuration='200ms'
          animateOnRender
        />
      )}
      <div className='container'>
        <SearchBar data={data} QueryText={queryText} />
        {error && (
          <h3 style={{ marginTop: '10px', fontSize: '22px' }}>
            Rate of search exceeded, please wait a few seconds before trying
            again.
          </h3>
        )}
        {data && !error && (
          <>
            <div className='search-info'>
              <QuerySettings
                typeOfQuery={query.type}
                QueryLanguage={debouncedFunctions.queryLanguage}
                QueryType={debouncedFunctions.queryType}
              />

              <DisplayResults
                SortOptions={debouncedFunctions.sortOptions}
                data={data}
                typeOfQuery={query.type}
                isLoading={isLoading}
              />
            </div>
            <Pagination
              ChangePage={debouncedFunctions.changePage}
              itemsPerPage={query.itemsPerPage}
              items={data.total_count}
            />
            <Footer />
          </>
        )}
      </div>
    </>
  );
}
