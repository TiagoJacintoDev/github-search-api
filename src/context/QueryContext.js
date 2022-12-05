import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const QueryContext = createContext();

export function QueryContextProvider({ children }) {
  const [query, setQuery] = useState({
    type: "repositories",
    text: "",
    languages: [],
    sort: "",
    order: "",
    page: 1,
    itemsPerPage: 10,
  });

  function queryText(text) {
    setQuery((lastQuery) => ({
      ...lastQuery,
      text,
    }));
  }

  function queryLanguage(e) {
    e.target.toggleAttribute("data-selected");
    setQuery((lastQuery) => {
      if (lastQuery.languages.includes(e.target.textContent)) {
        return {
          ...lastQuery,
          languages: lastQuery.languages.filter(
            (language) => language !== e.target.textContent
          ),
        };
      } else {
        return {
          ...lastQuery,
          languages: [...lastQuery.languages, e.target.textContent],
        };
      }
    });
  }

  function queryType(e) {
    setQuery((lastQuery) => ({
      ...lastQuery,
      type: e.target.textContent.toLowerCase(),
    }));
  }

  function sortResults(e) {
    const splittedValue = e.target.value.split(" ");
    const order = splittedValue[0];
    const sort = splittedValue[1];
    setQuery((lastQuery) => ({
      ...lastQuery,
      order,
      sort,
    }));
  }

  function changePage(pageNumber) {
    setQuery((lastQuery) => ({
      ...lastQuery,
      page: pageNumber,
    }));
  }

  return (
    <QueryContext.Provider
      value={{
        query,
        queryText,
        queryLanguage,
        queryType,
        sortResults,
        changePage,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}

export const QueryData = () => {
  return useContext(QueryContext);
};
