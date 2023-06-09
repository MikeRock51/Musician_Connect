import Input from "../form_pieces/Input";
import Select from "../form_pieces/Select";

function Booking() {
    return (
        <div className="px-5">
            <form action="" className="row">
                <Input
                    type="text"
                    text="Event Type"
                    className="form-control"
                    name="event_type"
                    mandatory={true}
                // onChange={handleChange}
                />
                <Input
                    type="datetime-local"
                    name="event_date"
                    text="Event Date/Time"
                    // className="form-control"
                    id="datetime-input"
                />
                <Input
                    type="text"
                    text="Event Address"
                    className="form-control"
                    name="event_address"
                    mandatory={true}
                // onChange={handleChange}
                />
                <Select
                    name="city"
                    text="City"
                // items={cities}
                // onChange={props.onChange} text="City"
                />
            </form>
        </div>
    )
}

export default Booking;
