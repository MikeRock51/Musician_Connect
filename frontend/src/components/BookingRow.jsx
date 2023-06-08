import { useState } from "react";
import useFetch from "./utilities/useFetch";

function BookingRow(props) {
    const booking = props.bookingInfo;
    const [respondentId, setRespondentId] = useState(props.userType === 'client' ?
        booking.musician_id : booking.client_id);
    console.log(respondentId);
    const respondentUrl = `http://127.0.0.1:7000/api/v1/users/${respondentId}`;
    const { data: respondent } = useFetch(respondentUrl);

    return (
        <tbody>
            <tr>
                <th className="grey" scope="row">{props.row}</th>
                <td className="grey">Azeez Josephine</td>
                <td className="grey">Bithday Party</td>
                <td className="grey">16-08-2023/3:00PM</td>
                <td className="grey">Garki 2</td>
                <td className="grey">False</td>
            </tr>
        </tbody>
    )
    // personId={user.userType.toLowerCase() === 'client' ?
    //                     bookings.musician_id : bookings.client_id}
    //                 event={bookings.event_type}
}

export default BookingRow;
