import { useState, useRef } from "react";

function Input(props) {
    const [input, setInput] = useState("");
    // const [error, setError] = useState(true);
    const inputRef = useRef(null);
    const inputElement = inputRef.current;
    let [validInput, setValidInput] = useState(undefined);

    function handleChange(event) {
        // alert(inputElement);
        const value = event.target.value;
        setInput(value);
        if (inputElement && value.length > 1) {
            console.log(inputElement.validity.valid);
            setValidInput(inputElement.validity.valid);
            validInput = inputElement.validity.valid;
        }
        props.onChange(props.name, value, undefined, validInput);
    }

    return (
        props.type ?
            <div className="col-md-6 mt-2">
                <label className="form-label text-light">{props.text}</label>
                <input
                    type={props.type}
                    name={props.name}
                    className="form-control"
                    placeholder={props.name === 'price_by_hour' ? 'How much do you charge per hour?' : props.text}
                    required={props.mandatory ? true : false}
                    value={input}
                    ref={inputRef}
                    pattern={props.pattern && props.pattern}
                    onChange={handleChange}
                    minLength={props.name === 'password' ? "8" : ""}
                />
                {inputElement && !validInput && <p className="pt-2 mb-0 bright">{inputElement.validationMessage}</p>}
                {props.name === 'confirmPassword' &&
                    input !== props.pwd && input.length > 0 &&
                    <p className="pt-2 bright">Password Mismatch</p>}
            </div> :
            <div className="form-floating">
                <textarea name="description" id={props.id && props.id}
                    className="form-control"
                    style={{ height: "100px" }}
                    onChange={handleChange}
                    value={input}
                    ref={inputRef}
                />
                <label className="form-label" >{props.text}</label>
            </div>
    )
}

export default Input;
