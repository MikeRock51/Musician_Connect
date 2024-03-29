import { useState, useEffect } from "react";

function useFetch(url, dependencies = []) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortControl = new AbortController();

    fetch(`http://0.0.0.0:7000/api/v1${url}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      signal: abortControl.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Failed to fetch requested data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setError(error.message);
          setIsPending(false);
        }
      });

    return () => {
      abortControl.abort();
    };
  }, [url, ...dependencies]);

  return { data, isPending, error };
}

export default useFetch;
