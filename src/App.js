import SearchBar from "./components/elements/SearchBar";
import DisplayResults from "./components/pages/DisplayResults";
import Footer from "./components/elements/Footer";
import QuerySettings from "./components/elements/QuerySettings";
import Pagination from "./components/elements/Pagination";
import LoadingBar from "./components/elements/LoadingBar";
import { ResultsData } from "./context/ResultsContext";

export default function App() {
  const { results, isLoading, error } = ResultsData();
  return (
    <>
      {isLoading && <LoadingBar />}
      <div className="container">
        <SearchBar />
        {error && (
          <h3 className="error-message">
            Rate of search exceeded, please wait a few seconds before trying
            again.
          </h3>
        )}
        {results && !error && (
          <>
            <div className="search-info">
              <QuerySettings />
              <DisplayResults />
            </div>
            <Pagination />
          </>
        )}
        <Footer />
      </div>
    </>
  );
}
