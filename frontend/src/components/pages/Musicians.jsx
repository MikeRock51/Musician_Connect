import { useState } from "react";
import User from "../User";
import useFetch from "../utilities/useFetch";

function Musicians(props) {
    const musiciansUrl = 'http://192.168.43.248:7000/api/v1/users/type/musician';
    const { data: musicians } = useFetch(musiciansUrl);

    // console.log(musicians);

    return (
        <div className="musicians">
            {musicians && musicians.map((musician) => {
                // console.log(musician);
                return (
                    <User
                        loggedIn={props.loggedIn}
                        loggedInUser={props.loggedInUser}
                        musician={musician}
                        key={musician.id}
                        sendBookingInitials={props.sendBookingInitials}
                    />
                )
            })}
        </div>
    )
}

export default Musicians;
