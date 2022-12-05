import { Octokit } from "@octokit/core";
import { useEffect, useState } from "react";

const auth = process.env.REACT_APP_API_KEY;
export default function useOctokitFetch(
  endpoint,
  dependencies,
  fetchCondition
) {
  const octokit = new Octokit({ auth });

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await octokit.request(endpoint);
        const data = await response.data;
        setData(data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    if (fetchCondition === undefined) {
      fetchData();
    } else {
      fetchCondition && fetchData();
    }

    return function cleanup() {
      setError(null);
    };
  }, [dependencies]);

  return { data, isLoading, error };
}
