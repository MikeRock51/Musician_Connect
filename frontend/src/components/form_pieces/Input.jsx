import { useState } from "react";

function Input(props) {
    const [input, setInput] = useState("");

    function handleChange(event) {
        const value = event.target.value;
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
        </div>
    )
}

export default Input;
