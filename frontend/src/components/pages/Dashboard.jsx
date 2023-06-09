import { useEffect, useState } from "react";
import BookingRow from "../BookingRow";

function Dashboard(props) {
    // const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('loggedInUser')));
    const [user, setUser] = useState(props.userInfo);
    const [bookings, setBookings] = useState(user && user.bookings);
    let [respondentId, setRespondentId] = useState(null);

    return (
        <div className="dashboard">
            <h3 className="teal pb-3">Welcome {user && user.firstName}</h3>
            <div className="px-3">
                <h6 className="bookings cinnabar">Your Bookings</h6>
                <table className="table table-striped table-bordered table-success">
                    <thead>
                        <tr>
                            <th className="teal" scope="col">#</th>
                            <th className="teal" scope="col">{user && user.userType.toLowerCase() ===
                                'client' ? 'Musician' : 'Client'}</th>
                            <th className="teal" scope="col">Event</th>
                            <th className="teal" scope="col">Event Date/Time</th>
                            <th className="teal" scope="col">Event City</th>
                            <th className="teal" scope="col">Location</th>
                            <th className="teal" scope="col">Completed</th>
                        </tr>
                    </thead>
                    {bookings && bookings.map((booking, index) => {
                        // setRespondentId(user.userType === 'client' ? booking.musician_id : booking.client_id);
                        respondentId = user.userType.toLowerCase() === 'client' ? booking.musician_id : booking.client_id;
                        return <BookingRow
                            key={booking.id}
                            row={index + 1}
                            respondentId={respondentId}
                            bookingInfo={booking}
                        />
                    })}
                </table>
                <a href="/users/musicians" className="link-underline link-underline-opacity-0 hover">
                    {user.userType.toLowerCase() === 'client' && "Create new booking"}
                </a>
            </div>
        </div>
    )
}

export default Dashboard;
