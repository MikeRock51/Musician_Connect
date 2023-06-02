import { useState, useEffect } from "react";


function useFetch(url) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        const abortControl = new AbortController();

        fetch(url, { signal: abortControl.signal})
        .then((res) => {
            if (!res.ok) {
                throw Error("Failed to fetch requested data");
            }
            return res.json();
    }).then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
    }).catch(error => {
        if (error.name !== 'AbortError') {
            setError(error.message);
            setIsPending(false);
        }
    })
    
    return () => {
        abortControl.abort();
    }
    }, [url]);

    return {data, isPending, error};
}

export default useFetch;
