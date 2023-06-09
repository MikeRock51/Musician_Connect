import Input from "../form_pieces/Input";
import Select from "../form_pieces/Select";

function Booking() {
    return (
        <div>
            <form action="" className="">
                <Input
                    type="text"
                    text="Event Type"
                    className="form-control"
                    name="event_type"
                    mandatory={true}
                // onChange={handleChange}
                />
                <Input
                    type="text"
                    text="Event Address"
                    className="form-control"
                    name="event_address"
                    mandatory={true}
                // onChange={handleChange}
                />
                <Input
                    type="text"
                    text="Event Type"
                    className="form-control"
                    name="event_type"
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
