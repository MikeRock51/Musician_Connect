import { useState } from "react";

function Select(props) {
    const [input, setInput] = useState('');

    return (
        <div className="col-md-6">
            <label className="form-label">{props.text}</label>
            <select
                className="form-select"
                name={props.name}
                required>
                <option disabled selected hidden>Choose...</option>
                {props.items.map((item) => {
                    return <option>{item}</option>
                })}
            </select>
        </div>
    )
}

export default Select;
