import { useState, useEffect } from "react";


function usePost(url) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        const abort = new AbortController();

        fetch(url, { signal: abort})
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
        if (error.name !== 'Abort Error') {
            setError(error.message);
            setIsPending(false);
        }
    })
    
    return () => {
        abort.abort();
    }
    }, [url]);

    return {data, isPending, error};
}

export default usePost;
