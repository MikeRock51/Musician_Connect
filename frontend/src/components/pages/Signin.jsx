import React from "react";
import Input from "../form_pieces/Input";

function Signin(props) {
    return (
        // <div className="col-md-6">
        //     <label className="form-label">Email</label>
        //     <input
        //         type="email"
        //         name="email"
        //         className="form-control"
        //         placeholder={props.name === 'price_by_hour' ? 'How much do you charge per hour?' : props.text}
        //         required={props.mandatory ? true : false}
        //         value={input}
        //         ref={inputRef}
        //         pattern={props.pattern && props.pattern}
        //         onChange={handleChange}
        //     />
        // </div>

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
            </div>
            <div className="col-md-6 ms-1">
                <button type="submit" className="btn col-12">
                    Sign in
                </button>
            </div>
        </form>
    )
}

export default Signin;
