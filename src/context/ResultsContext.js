import { useContext } from "react";
import { createContext } from "react";
import { QueryData } from "./QueryContext";
import useOctokitFetch from "../hooks/useOctokitFetch";
import { useMemo } from "react";

const ResultsContext = createContext();

export function ResultsContextProvider({ children }) {
  const { query } = QueryData();
  const languages = query.languages.map(
    (language) => `+language%3A${language}`
  );
  const queryText = query.text.replace(/ /g, "%20");

  const { data: results, ...data } = useOctokitFetch(
    `GET /search/${query.type}?q=${queryText}${languages}&sort=${query.sort}&order=${query.order}&page=${query.page}&per_page=${query.itemsPerPage}`,
    useMemo(() => query),
    query.text
  );

  return (
    <ResultsContext.Provider value={{ results, ...data }}>
      {children}
    </ResultsContext.Provider>
  );
}

export const ResultsData = () => {
  return useContext(ResultsContext);
};
