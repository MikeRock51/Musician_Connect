import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Select(props) {
    const [choice, setChoice] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const inputElement = inputRef.current;
    const [validInput, setValidInput] = useState(inputElement &&
        choice === '' ? false : true);

    function handleChange(event) {
        const value = event.target.value;
        setValidInput(value === '' ? false : true);
        props.onChange(props.name, value, undefined, undefined);
        setChoice(value);
        // console.log(validInput);
    }

    return (
        <div className="col-md-6">
            <label className="form-label">{props.text}</label>
            <select
                className="form-select"
                name={props.name}
                value={choice}
                ref={inputRef}
                onChange={handleChange}
                required>
                <option value=''>Select...</option>
                {props.items && props.items.map((item) => {
                    return <option value={props.name === 'userType' ? item.name :
                        JSON.stringify(item)} key={item.id}>{item.name}</option>
                })}
            </select>
            {inputElement && !validInput && <p className="pt-2 mb-0 teal">{inputElement.validationMessage}</p>}
            {props.addButton && <div className="col-sm-12 pt-3">
                <button
                    type="submit"
                    className="btn col-4 anime"
                    onClick={(event) => {
                        event.preventDefault();
                        validInput && navigate("/register");
                    }}
                >Confirm</button>
            </div>}
        </div>
    )
}

export default Select;
