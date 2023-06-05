import { useState } from "react";

function Input(props) {
    const [input, setInput] = useState("");
    const [error, setError] = useState(true);

    function handleChange(event) {
        const value = event.target.value;
        setError(value.length === 0 ? true : false);
        props.onChange(props.name, value);
        setInput(value);
    }

    return (
        <div className="col-md-6">
            <label className="form-label">{props.text}</label>
            <input
                type={props.type}
                name={props.name}
                className="form-control"
                placeholder={props.name === 'price_by_hour' ? 'How much do you charge per hour?' : props.text}
                required={props.mandatory ? true : false}
                value={input}
                onChange={handleChange}
            />
            {error && <h6 className="pt-2 cinnabar">Field cannot be empty</h6>}
            {props.name === 'confirmPassword' &&
                input !== props.pwd && input.length > 0 &&
                <h6 className="pt-2 cinnabar">Password Mismatch</h6>}
        </div>
    )
}

export default Input;
