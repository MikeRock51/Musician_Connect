import { useState } from "react";

function Input(props) {
    const [input, setInput] = useState("");
    const [data, setData] = useState({});

    function handleChange(event) {
        const {value} = event.target;
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
                onSubmit={props.onSubmit(input)}
                />
        </div>
    )
}

export default Input;
