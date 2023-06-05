import React from "react";
import Input from "../form_pieces/Input";

function Signin(props) {
    return (
        <form className="row g-3 mx-5">
            <Input type="email" name="email" text="Email"
                mandatory={true}
            onChange={props.onChange}
            />
            <Input type="password" name="password" text="Password"
                mandatory={true}
            onChange={props.onChange}
            />
            <button type="submit" className="btn">
                Sign in
            </button>
        </form>
    )
}

export default Signin;
