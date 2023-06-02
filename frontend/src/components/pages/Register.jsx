import { useState } from "react";
import Input from "../form_pieces/Input";
import Select from "../form_pieces/Select";

function Register() {
    const [firstName, setFirstName] = useState('');

    return (
        <form className="row g-3 mx-5">
            <Input type="text" name="fName" text="First Name"
                onChange={setFirstName} mandatory={true} />
            <Input type="text" name="lName" text="Last Name" mandatory={true} />
            <Select name="userType" items={['Client', 'Musician']} text="Account Type" />
            <Input type="text" name="alias" text="Alias" mandatory={false} />
            <Input type="email" name="email" text="Email" mandatory={true} />
            <Input type="password" name="password" text="Password" mandatory={true} />
            <Input type="password" name="confirm-password" text="Confirm Password"
                mandatory={true} />
            <Select name="State" items={['Abuja']} text="State" />
            <Select name="city" items={['Dutse-Alhaji', 'Gwarinpa', 'Kubwa']} text="City" />
            <Input type="text" name="price_by_hour" text="Price Per Hour" mandatory={true} />

            <div className="mb-3">
                <label className="form-label">Upload profile picture:</label>
                <input type="file" className="form-control form-control-sm"
                    id="formFileSm" name="dp" accept="image/*" />
            </div>
            <div className="col-12">
                <button type="submit" className="btn">Create my account</button>
            </div>
        </form>
    )
}

export default Register;
