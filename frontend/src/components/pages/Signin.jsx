import React, { useEffect, useState } from "react";
import Input from "../form_pieces/Input";
import { useNavigate } from "react-router-dom";

function Signin(props) {
    let [data, setData] = useState({});
    const [isPending, setIsPending] = useState(null);
    let [verified, setVerified] = useState(false);
    const navigate = useNavigate();

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
                return res.json();
            }).then((data) => {
                if (data.error && data.error === 'Not Found') {
                    data = ({ "error": "User does not exist" });
                }
                setData(data);
                setIsPending(false);
            }).catch(err => {
                console.log(err);
                setIsPending(false);
            })
        return data;
    }

    function handleClicked(event) {
        event.preventDefault();
        props.isValid && handleSubmit();
        !props.isValid && alert(
            'One or more invalid responses, please check and try again...')
    }

    function handleSubmit() {
        const authUrl = 'http://127.0.0.1:7000/api/v1/users/auth';

        // Verify that all required fields have value
        if (props.userData.password && props.userData.password.length < 1) {
            setVerified(false);
            alert("Please provide a password");
        } else if (props.userData.email && props.userData.email.length < 1) {
            setVerified(false);
            alert("Email cannot be empty");
        } else {
            setVerified(true);
            verified = true;
        }

        if (verified) {
            // console.log(props.userData);
            setIsPending(true);
            postIt(authUrl, props.userData);
        } else { alert('Please fill all required fields'); }
    }

    useEffect(() => {
        if (data !== {} && !isPending && !data.error) {
            // const userInfo = JSON.stringify(data);
            // console.log(userInfo);
            console.log(data);
            navigate(`/dashboard/${JSON.stringify(data)}`);
        }
        // console.log(data);
        // props.printData(data);
    }, [data]);

    return (
        <form className="row g-3 p-5 mx-5">
            <div className="col-12">
                <Input className="" type="email" name="email" text="Email"
                    mandatory={true}
                    onChange={props.onChange}
                />
                <Input type="password" name="password" text="Password"
                    mandatory={true}
                    onChange={props.onChange}
                />
                {data.error && !isPending && <p className="pt-2 mb-0 teal">{data.error}</p>}
                {isPending && <p className="pt-2 mb-0 teal">Loading your account...</p>}
            </div>
            <div className="col-md-6 ms-1">
                <button type="submit" className="btn col-12"
                    onClick={handleClicked}>
                    Sign in
                </button>
            </div>
        </form>
    )
}

export default Signin;
