import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Select(props) {
    const [choice, setChoice] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleChange(event) {
        const value = event.target.value;
        setError(value.length === 0 ? true : false);
        props.onChange(props.name, value);
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
                {props.items && props.items.map((item) => {
                    return <option value={props.name === 'userType' ? item.name : JSON.stringify(item)} key={item.id}>{item.name}</option>
                })}
            </select>
            {error && <h6 className="pt-2 cinnabar">Please select a value</h6>}
            {props.addButton && <div className="col-sm-12 pt-3">
                <button
                    type="submit"
                    className="btn col-4"
                    onClick={() => {
                        // alert(error)
                        if (!error) {
                            navigate("/register");   
                        }
                    }}
                >Confirm</button>
            </div>}
        </div>
    )
}

export default Select;
