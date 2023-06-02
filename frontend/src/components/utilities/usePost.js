import { useState, useEffect } from "react";


function usePost(url, user) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
        .then((res) => {
            if (!res.ok) {
                throw Error("Failed to create your account");
            }
            return res.json();
        }).then((data) => {
            setData(data);
            setIsPending(false);
            setError(null);
        }).catch(error => {
            setError(error.message);
            setIsPending(false);
        })
    return { data, isPending, error };
}

export default usePost;
