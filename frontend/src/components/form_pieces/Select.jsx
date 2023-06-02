import { useState } from "react";

function Select(props) {
    const [choice, setChoice] = useState('');

    function handleChange(event) {
        const value = event.target.value;
        props.onComplete(props.name, value);
        setChoice(value);
    }

    return (
        <div className="col-md-6">
            <label className="form-label">{props.text}</label>
            <select
                className="form-select"
                name={props.name}
                value={choice}
                onChange={handleChange}
                required>
                <option value=''>Choose...</option>
                {props.items.map((item, index) => {
                    return <option value={item} key={index}>{item}</option>
                })}
            </select>
        </div>
    )
}

export default Select;
