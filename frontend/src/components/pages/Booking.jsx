import { useState } from "react";
import Input from "../form_pieces/Input";
import Select from "../form_pieces/Select";
import useFetch from "../utilities/useFetch";

function Booking(props) {
    const statesUrl = 'http://127.0.0.1:7000/api/v1/states';
    const states = useFetch(statesUrl).data;
    const cities = props.bookingData.state && JSON.parse(props.bookingData.state).cities;
    // console.log(cities);

    return (
        <div className="px-5">
            <form action="" className="row">
                <Input
                    type="text"
                    text="Event Type"
                    className="form-control"
                    name="event_type"
                    mandatory={true}
                    onChange={props.onChange}
                />
                <Input
                    type="text"
                    text="Event Address"
                    className="form-control"
                    name="event_address"
                    mandatory={true}
                    onChange={props.onChange}
                />
                <Select
                    name="state"
                    text="State"
                    items={states}
                    onChange={props.onChange}
                />
                <Select
                    name="city"
                    text="City"
                    items={cities}
                    onChange={props.onChange}
                />
                <Input
                    type="datetime-local"
                    name="event_date"
                    text="Event Date/Time"
                    id="datetime-input"
                    onChange={props.onChange}
                />
            </form>
        </div>
    )
}

export default Booking;
