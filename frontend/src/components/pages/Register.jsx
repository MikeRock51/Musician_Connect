import { useState } from "react";
import Input from "../form_pieces/Input";
import Select from "../form_pieces/Select";

function Register() {
    const [userData, setUserData] = useState({});

    function retrieveInput(key, value) {
        setUserData((prevData) => {
            return {
                ...prevData,
                [key]: value
            }

        });
    }

    function handleSubmit(event) {
        // event.preventDefault();
        console.log(userData);
    }

    return (
        <form className="row g-3 mx-5">
            <Input type="text" name="firstName" text="First Name"
                mandatory={true} onComplete={retrieveInput} />
            <Input type="text" name="lastName" text="Last Name"
                mandatory={true} onComplete={retrieveInput} />
            <Input type="text" name="alias" text="Alias"
                mandatory={false} onComplete={retrieveInput} />
            <Input type="email" name="email" text="Email"
                mandatory={true} onComplete={retrieveInput} />
            <Input type="password" name="password" text="Password"
                mandatory={true} onComplete={retrieveInput} />
            <Input type="password" name="confirm-password" text="Confirm Password"
                mandatory={true} onComplete={retrieveInput} />
            <Select name="State" items={['Abuja']} text="State"
                onComplete={retrieveInput} />
            <Select name="city" items={['Dutse-Alhaji', 'Gwarinpa', 'Kubwa']}
                onComplete={retrieveInput} text="City" />
            <Input type="text" name="price_by_hour" text="Price Per Hour"
                mandatory={true} onComplete={retrieveInput} />

            <div className="mb-3">
                <label className="form-label">Upload profile picture:</label>
                <input type="file" className="form-control form-control-sm"
                    id="formFileSm" name="dp" accept="image/*" />
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
