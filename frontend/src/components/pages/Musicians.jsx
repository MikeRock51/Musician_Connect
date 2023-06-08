import { useState } from "react";
import User from "../User";
import useFetch from "../utilities/useFetch";

function Musicians() {
    const musiciansUrl = 'http://127.0.0.1:7000/api/v1/users/type/musician';
    const { data: musicians } = useFetch(musiciansUrl);

    // console.log(musicians);

    return (
        <div className="musicians">
            {musicians && musicians.map((musician) => {
                console.log(musician);
                return (
                    <User
                        musician={musician}
                        key={musician.id}
                    />
                )
            })}
        </div>
    )
}

export default Musicians;
