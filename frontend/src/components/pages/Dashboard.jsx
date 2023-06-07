import { useState } from "react";
import BookingRow from "../BookingRow";

function Dashboard(props) {
    const [user, setUser] = useState(props.userInfo && props.userInfo);
    console.log((props.userInfo));

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
            </table>
            <a href="#" className="nav-link hover">
                {user.userType.toLowerCase() === 'client' && "Create new booking"}
            </a>
        </div>
    )
}

export default Dashboard;
