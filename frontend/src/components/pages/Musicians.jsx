import User from "../User";
import useFetch from "../utilities/useFetch";

function Musicians(props) {
    const musiciansUrl = '/users/type/musician';
    const { data: musicians } = useFetch(musiciansUrl);

    return (
        <div className="musicians">
            {musicians && musicians.map((musician) => {
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
