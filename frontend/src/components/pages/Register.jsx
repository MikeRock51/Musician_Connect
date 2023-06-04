import { useState } from "react";
import Input from "../form_pieces/Input";
import Select from "../form_pieces/Select";
import Checklist from "../form_pieces/Checklist";
import useFetch from "../utilities/useFetch";

function Register(props) {
    const statesUrl = 'http://127.0.0.1:7000/api/v1/states';
    const { data: states } = useFetch(statesUrl);
    const cities = props.userData.state && JSON.parse(props.userData.state).cities;
    // cities && console.log(cities);
    // console.log(props.userData)

    return (
        <form className="row g-3 mx-5">
            <Input type="text" name="firstName" text="First Name"
                mandatory={true} onChange={props.onChange} />
            <Input type="text" name="lastName" text="Last Name"
                mandatory={true} onChange={props.onChange} />
            <Input type="email" name="email" text="Email"
                mandatory={true} onChange={props.onChange} />
            <Input type="tel" name="phone" text="Phone Number"
                mandatory={true} onChange={props.onChange} />
            <Input type="password" name="password" text="Password"
                mandatory={true} onChange={props.onChange} />
            <Input type="password" name="confirmPassword" text="Confirm Password"
                mandatory={true} onChange={props.onChange} />
            <Select name="state" items={states} text="State"
                onChange={props.onChange} />
            <Select name="city"
                items={cities}
                onChange={props.onChange} text="City" />
            {props.userData.userType === 'Musician' && <Input
                type="text" name="alias" text="Alias"
                mandatory={false} onChange={props.onChange} />}
            {props.userData.userType === 'Musician' && <Checklist
                onChange={props.onChange}
                name='instruments'
                checkedItems={props.userData.instruments}
            />}
            {props.userData.userType === 'Musician' && <Input type="text" name="price_by_hour" text="Price Per Hour"
                mandatory={true} onChange={props.onChange} />}

            <div className="mb-3 col-lg-6">
                <label className="form-label">Upload profile picture:</label>
                <input type="file" className="form-control form-control"
                    id="formFileSm" name="profilePicture" accept="image/*"
                    onChange={(event) => {
                        console.log(event.target.value)
                        props.onChange(event.target.name, event.target.value);
                    }}
                     />
            </div>
            <div className="col-12">
                <button type="submit" className="btn"
                    onClick={props.handleSubmit}
                >
                    Create my account
                </button>
            </div>
        </form>
    )
}

export default Register;
