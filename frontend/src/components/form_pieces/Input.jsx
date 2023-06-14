import { useState, useRef } from "react";

function Input(props) {
  const [userInput, setInput] = useState("");
  // const [error, setError] = useState(true);
  const inputRef = useRef(null);
  const inputElement = inputRef.current;
  let [validInput, setValidInput] = useState(
    !inputElement ? true : inputElement.validity.valid
  );

  function handleChange(event) {
    inputElement && setValidInput(inputElement.validity.valid);
    const value = event.target.value;
    setInput(value);
    props.onChange(props.name, value, undefined, validInput);
  }

  return props.type ? (
    <div className="">
      <label className="form-label text-light">
        {props.text}
        {inputElement && !validInput && (
          <span className="pt-2 mb-0 bright">
            {" "}
            [ {inputElement.validationMessage} ]
          </span>
        )}
        {props.name === "confirmPassword" &&
          userInput !== props.pwd &&
          userInput.length > 0 && (
            <span className="pt-2 mb-0 bright"> [ Password Mismatch ]</span>
          )}
      </label>
      <input
        type={props.type}
        name={props.name}
        className="form-control"
        placeholder={
          props.name === "price_by_hour"
            ? "How much do you charge per hour?"
            : props.text
        }
        required={props.mandatory ? true : false}
        value={userInput}
        ref={inputRef}
        pattern={props.pattern && props.pattern}
        onChange={handleChange}
        minLength={props.name === "password" ? "8" : ""}
      />
    </div>
  ) : (
    <div className="form-floating">
      <textarea
        name="description"
        id={props.id && props.id}
        className="form-control"
        style={{ height: "100px" }}
        onChange={handleChange}
        value={userInput}
        ref={inputRef}
      />
      <label className="form-label">{props.text}</label>
    </div>
  );
}

export default Input;
