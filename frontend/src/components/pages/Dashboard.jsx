import { useEffect, useState } from "react";
import BookingRow from "../BookingRow";

function Dashboard(props) {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('userInfo')));
    const [bookings, setBookings] = useState(user.bookings);
    const [respondentId, setRespondentId] = useState(bookings.length !== 0 &&
        user.userType.toLowerCase() === 'client' ?
        bookings[0].musician_id : bookings[0].client_id);

    // console.log(respondentId);

    return (
        <div className="dashboard">
            <h3 className="teal pb-3">Welcome {user && user.firstName}</h3>
            <h6 className="bookings cinnabar">Your Bookings</h6>
            <table className="table">
                <thead>
                    <tr>
                        <th className="teal" scope="col">#</th>
                        <th className="teal" scope="col">{user && user.userType.toLowerCase() ===
                            'client' ? 'Musician' : 'Client'}</th>
                        <th className="teal" scope="col">Event</th>
                        <th className="teal" scope="col">Event Date/Time</th>
                        <th className="teal" scope="col">Event City</th>
                        <th className="teal" scope="col">Completed</th>
                    </tr>
                </thead>
                <BookingRow />
                {bookings && bookings.map((booking, index) => {
                    return <BookingRow
                        key={booking.id}
                        row={index + 1}
                        respondentId={respondentId}
                        bookingInfo={booking}
                    />
                })}
            </table>
            <a href="#" className="nav-link hover">
                {user.userType.toLowerCase() === 'client' && "Create new booking"}
            </a>
        </div>
    )
}

export default Dashboard;
