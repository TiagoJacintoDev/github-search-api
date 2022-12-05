import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryContextProvider } from "./context/QueryContext";
import { ResultsContextProvider } from "./context/ResultsContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryContextProvider>
    <ResultsContextProvider>
      <App />
    </ResultsContextProvider>
  </QueryContextProvider>
);
