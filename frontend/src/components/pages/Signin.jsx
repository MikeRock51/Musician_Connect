import React, { useEffect, useState } from "react";
import Input from "../form_pieces/Input";
import { useNavigate } from "react-router-dom";

function Signin(props) {
    // let [data, setData] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [isPending, setIsPending] = useState(null);
    let [verified, setVerified] = useState(false);
    const navigate = useNavigate();

    function handleClicked(event) {
        event.preventDefault();
        handleSubmit()
        // props.isValid && handleSubmit();
        // !props.isValid && alert(
        //     'One or more invalid responses, please check and try again...')
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
            fetch(authUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost/3000"
                },
                body: JSON.stringify(props.userData)
            })
                .then((res) => {
                    return res.json();
                }).then((data) => {
                    if (data.error && data.error === 'Not Found') {
                        data = ({ "error": "User does not exist" });
                    }
                    setUserInfo(data);
                    if (!isPending && !data.error) {
                        sessionStorage.setItem("loggedInUser", JSON.stringify(data));
                        props.setLoggedIn(true);
                        navigate('/user/dashboard');
                    }
                    // userInfo = data;
                    // console.log(userInfo);
                    setIsPending(false);
                }).catch(err => {
                    console.log(err);
                    setIsPending(false);
                })
        } else { alert('Please fill all required fields'); }
    }

    return (
        <form className="row g-3 mx-5">
            <div className="">
                <Input className="" type="email" name="email" text="Email"
                    mandatory={true}
                    onChange={props.onChange}
                />
                <Input type="password" name="password" text="Password"
                    mandatory={true}
                    onChange={props.onChange}
                />
                {userInfo.error && !isPending && <p className="pt-2 mb-0 teal">{userInfo.error}</p>}
                {isPending && <p className="pt-2 mb-0 teal">Loading your account...</p>}
            </div>
            <div className="col-md-6 ms-1">
                <button type="submit" className="btn col-12 anime mb-3"
                    onClick={handleClicked}>
                    Sign in
                </button>
                <span className="text-light">
                    Don't have an account?
                    <a href="/register/user-type"
                        className="link-underline link-underline-opacity-0 hover bright"> Sign Up here</a>
                </span>
            </div>
        </form>
    )
}

export default Signin;
