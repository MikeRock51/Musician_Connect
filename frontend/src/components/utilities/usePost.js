import { useState, useEffect } from "react";


function usePost(url, jsonData) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(null);

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost/3000"
        },
        body: JSON.stringify(jsonData)
    })
        .then((res) => {
            return res.json();
        }).then((data) => {
            if (data.error && data.error === 'Not Found') {
                data = ({ "error": "User does not exist" });
            }
            setData(data);
            setIsPending(false);
        }).catch(err => {
            console.log(err);
            setIsPending(false);
        })

    return data;
}

export default usePost;
