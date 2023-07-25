import { useState } from "react";
import Input from "../form_pieces/Input";
import Select from "../form_pieces/Select";
import useFetch from "../utilities/useFetch";
import { useNavigate } from "react-router-dom";

function Booking(props) {
  const statesUrl = "/states";
  const states = useFetch(statesUrl).data;
  const cities =
    props.bookingData.state && JSON.parse(props.bookingData.state).cities;
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleClicked(event) {
    event.preventDefault();
    handleSubmit();
  }

  function handleSubmit(event) {
    const bookingUrl = "http://127.0.0.1:7000/api/v1/bookings";
    const postData = {
      city_id: JSON.parse(props.bookingData.city).id,
      ...props.bookingData,
    };
    delete postData.city;
    delete postData.state;

    setIsPending(true);
    fetch(bookingUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Error creating your booking, please try again");
        }
        return res.json();
      })
      .then((data) => {
        if (!data.error) {
          props.loggedInUser.bookings = [...props.loggedInUser.bookings, data];
          navigate("/user/dashboard");
        } else {
          setError(data);
        }
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }

  return (
    <div className="container-sm px-5 bg-info bg-opacity-25 rounded-3 my-5">
      <form onSubmit={handleClicked} className="row">
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
          mandatory={true}
        />
        <Select
          name="city"
          text="City"
          items={cities}
          onChange={props.onChange}
          mandatory={true}
        />
        <Input
          type="datetime-local"
          name="event_date"
          text="Event Date/Time"
          id="datetime-input"
          onChange={props.onChange}
          mandatory={true}
        />
        {error && !isPending && <p className="pt-2 mb-0 bright">{error}</p>}
        {isPending && (
          <p className="pt-2 mb-0 bright">Creating your booking...</p>
        )}
        <div className="ms-1 py-4">
          <button
            type="submit"
            className="btn col-12 anime fw-bold text-center text-danger"
          >
            Create Booking
          </button>
        </div>
      </form>
    </div>
  );
}

export default Booking;
