import { useState } from "react";
import Input from "../form_pieces/Input";
import Select from "../form_pieces/Select";
import Checklist from "../form_pieces/Checklist";
import useFetch from "../utilities/useFetch";

function Register(props) {
    const statesUrl = 'http://127.0.0.1:7000/api/v1/states';
    const { data: states } = useFetch(statesUrl);
    const state = props.userData.State && JSON.parse(props.userData.State);
    const stateId = state && state.id;
    const citiesUrl = stateId && `http://127.0.0.1:7000/api/v1/states/${stateId}/cities`;
    state && console.log(stateId)

    const { data: cities, error } = useFetch(citiesUrl);
    console.log(cities);

    function handleSubmit(event) {
        // event.preventDefault();
        // console.log(userData);
    }

    return (
        <form className="row g-3 mx-5">
            <Input type="text" name="firstName" text="First Name"
                mandatory={true} onChange={props.onChange} />
            <Input type="text" name="lastName" text="Last Name"
                mandatory={true} onChange={props.onChange} />
            {props.userData.userType === 'Musician' && <Input type="text" name="alias" text="Alias"
                mandatory={false} onChange={props.onChange} />}
            <Input type="email" name="email" text="Email"
                mandatory={true} onChange={props.onChange} />
            <Input type="password" name="password" text="Password"
                mandatory={true} onChange={props.onChange} />
            <Input type="password" name="confirm-password" text="Confirm Password"
                mandatory={true} onChange={props.onChange} />
            <Select name="State" items={states} text="State"
                onChange={props.onChange} />
            <Select name="city"
            items={cities}
                onChange={props.onChange} text="City" />
            <Checklist />
            {props.userData.userType === 'Musician' && <Input type="text" name="price_by_hour" text="Price Per Hour"
                mandatory={true} onChange={props.onChange} />}

            <div className="mb-3">
                <label className="form-label">Upload profile picture:</label>
                <input type="file" className="form-control form-control-sm"
                    id="formFileSm" name="profilePicture" accept="image/*" />
            </div>
            <div className="col-12">
                <button type="submit" className="btn"
                    onClick={handleSubmit}
                >
                    Create my account
                </button>
            </div>
        </form>
    )
}

export default Register;
