import { useState } from "react";
import useFetch from "./utilities/useFetch";

function BookingRow(props) {
    const booking = props.bookingInfo;
    const url = 'http://127.0.0.1:7000/api/v1';
    const respondentUrl = props.respondentId && `${url}/users/${props.respondentId}`;
    const { data: respondent } = useFetch(respondentUrl);
    const {data: city} = useFetch(`${url}/cities/${booking.city_id}`);

    // console.log(city);

    return (
        <tbody>
            <tr>
                <th className="grey" scope="row">{props.row}</th>
                <td className="grey">
                    <a href="#" className={
                        "link-offset-2 " +
                        "link-offset-3-hover " +
                        "link-underline " +
                        "link-underline-opacity-0 " +
                        "link-underline-opacity-75-hover"
                    }>
                        {respondent && `${respondent.firstName} ${respondent.lastName}`}
                    </a>
                </td>
                <td className="grey">{booking.event_type}</td>
                <td className="grey text-sm fs-6">{
                    new Date(booking.event_date).toLocaleString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: true,
                        timeZoneName: "short"
                      })
                }</td>
                <td className="grey">{city && city.name}</td>
                <td className="grey">{booking.event_address}</td>
                <td className="grey">False</td>
            </tr>
        </tbody>
    )
    // personId={
    //                 event={bookings.event_type}
}

export default BookingRow;
