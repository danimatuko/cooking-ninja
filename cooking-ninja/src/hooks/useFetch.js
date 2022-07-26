import React, { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();

        setData(json);
        setIsPending(false);
      } catch (error) {
        setIsPending(false);
        setError("Could not fetch the data");
      }
    })();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
