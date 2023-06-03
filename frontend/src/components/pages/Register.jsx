import { useState } from "react";
import Input from "../form_pieces/Input";
import Select from "../form_pieces/Select";
import Checklist from "../form_pieces/Checklist";
import useFetch from "../utilities/useFetch";

function Register(props) {
    const citiesUrl = 'http://127.0.0.1:7000/api/v1/cities';
    const statesUrl = 'http://127.0.0.1:7000/api/v1/states';
    const { data: cities } = useFetch(citiesUrl);
    const { data: states } = useFetch(statesUrl);

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
            {props.userType === 'Musician' && <Input type="text" name="alias" text="Alias"
                mandatory={false} onChange={props.onChange} />}
            <Input type="email" name="email" text="Email"
                mandatory={true} onChange={props.onChange} />
            <Input type="password" name="password" text="Password"
                mandatory={true} onChange={props.onChange} />
            <Input type="password" name="confirm-password" text="Confirm Password"
                mandatory={true} onChange={props.onChange} />
            <Select name="State" items={states} text="State"
                onChange={props.onChange} />
            <Select name="city" items={['Dutse-Alhaji', 'Gwarinpa', 'Kubwa']}
                onChange={props.onChange} text="City" />
            <Checklist />
            {props.userType === 'Musician' && <Input type="text" name="price_by_hour" text="Price Per Hour"
                mandatory={true} onChange={props.onChange} />}
            {props.userType === 'Musician' && <Input type="text" name="price_by_hour" text="Price Per Hour"
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
