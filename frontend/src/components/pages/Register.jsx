import { useState } from "react";
import Input from "../form_pieces/Input";
import Select from "../form_pieces/Select";
import Checklist from "../form_pieces/Checklist";
import useFetch from "../utilities/useFetch";

function Register(props) {
    const statesUrl = 'http://127.0.0.1:7000/api/v1/states';
    const { data: states } = useFetch(statesUrl);
    const cities = props.userData.state &&
        JSON.parse(props.userData.state).cities;

    // POST DATAs
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(null);
    const [error, setError] = useState(null);

    function postIt(url, jsonData) {
        // POST datas
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost/3000"
            },
            body: JSON.stringify(jsonData)
        })
            .then((res) => {
                if (!res.ok) {
                    console.log(res.json());
                    throw Error("Failed to create your account");
                }
                return res.json();
            }).then((data) => {
                setData(data);
                setIsPending(false);
                setError(null);
            }).catch(err => {
                setError(err.message);
                setIsPending(false);
            })
    }

    function duplicateObject(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    function handleSubmit(event) {
        event.preventDefault();
        let verified = false;
        const userPostUrl = 'http://127.0.0.1:7000/api/v1/users';
        const user = duplicateObject(props.userData);

        // Verify that password and confirm password fields match
        if (props.userData.password !== props.userData.confirmPassword) {
            alert('Password Mismatch');
            verified = true;
        }

        // Verify that all required fields have value
        for (let key in user) {
            if (user[key] !== 'profilePicture' &&
                user[key].length < 1) {
                alert(`${key} cannot be empty`)
                verified = false;
            } else { verified = true; }

            if (key === 'city' || key === 'state') {
                const id = key + '_id';
                user[id] = JSON.parse(user[key]).id;
                delete user[key];
            }

            if (key === 'instruments') {
                const instrumentIds = user[key].map((instrument) => {
                    return instrument.id;
                });
                user[key] = instrumentIds;
            }
        }

        if (verified) {
            console.log(user);
            postIt(userPostUrl, user);
            !isPending && !error && console.log(data);
            error && console.log(error);
        }
    }

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
            <Input type="password" name="confirmPassword"
                text="Confirm Password" pwd={props.userData.password}
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

            {/* <div className="mb-3 col-lg-6">
                <label className="form-label">Upload profile picture:</label>
                <input type="file" className="form-control form-control"
                    id="formFileSm" name="profilePicture" accept="image/*"
                    onChange={(event) => {
                        props.onChange(event.target.name, event.target.value);
                    }}
                    enctype="multipart/form-data"
                />
            </div> */}
            <div className="col-12">
                <button type="submit" className="btn"
                    onClick={handleSubmit}
                >
                    {!isPending && !error && "Create my account"}
                    {isPending && "Creating your account..."}
                    {error && error}
                </button>
            </div>
        </form>
    )
}

export default Register;
