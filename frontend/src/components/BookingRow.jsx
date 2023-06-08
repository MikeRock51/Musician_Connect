import { useState } from "react";
import useFetch from "./utilities/useFetch";

function BookingRow(props) {
    const booking = props.bookingInfo;
    const respondentUrl = props.respondentId && `http://127.0.0.1:7000/api/v1/users/${props.respondentId}`;
    const { data: respondent } = useFetch(respondentUrl);
    // console.log(respondent);

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
    // personId={
    //                 event={bookings.event_type}
}

export default BookingRow;
