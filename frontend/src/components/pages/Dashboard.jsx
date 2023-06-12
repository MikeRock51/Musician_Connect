import { useEffect, useState } from "react";
import BookingRow from "../BookingRow";

function Dashboard(props) {
  const [user, setUser] = useState(props.userInfo);
  const [bookings, setBookings] = useState(user && user.bookings);
  let [respondentId, setRespondentId] = useState(null);

  return (
    <div className="container-sm container-fluid">
      <div className="row px-1">
        <h3 className="ps-0 pinky shadow-text-light">Welcome {user && user.firstName}</h3>
        <h6
          className="col-sm-3 col-3 bg-brownie text-center p-1 my-2 rounded bright"
          style={{ fontSize: "2.2vw" }}
        >
          Your Bookings
        </h6>
        <div className="">
          <table
            className="table table-striped table-bordered table-success"
            style={{ fontSize: "1.5vw" }}
          >
            <thead>
              <tr>
                <th className="teal" scope="col">
                  #
                </th>
                <th className="teal" scope="col">
                  {user && user.userType.toLowerCase() === "client"
                    ? "Musician"
                    : "Client"}
                </th>
                <th className="teal" scope="col">
                  Event
                </th>
                <th className="teal" scope="col">
                  Date/Time
                </th>
                <th className="teal" scope="col">
                  City
                </th>
                <th className="teal" scope="col">
                  Location
                </th>
                <th className="teal" scope="col">
                  Completed
                </th>
              </tr>
            </thead>
            {bookings &&
              bookings.map((booking, index) => {
                respondentId =
                  user.userType.toLowerCase() === "client"
                    ? booking.musician_id
                    : booking.client_id;
                return (
                  <BookingRow
                    key={booking.id}
                    row={index + 1}
                    respondentId={respondentId}
                    bookingInfo={booking}
                  />
                );
              })}
          </table>
        </div>
        <a
          href="/users/musicians"
          className="link-underline link-underline-opacity-0 hover bright"
        >
          {user &&
            user.userType.toLowerCase() === "client" &&
            "Create new booking"}
        </a>
      </div>
    </div>
  );
}

export default Dashboard;
