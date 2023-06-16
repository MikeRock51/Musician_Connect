import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Select(props) {
  const [choice, setChoice] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const inputElement = inputRef.current;
  const [validInput, setValidInput] = useState(
    inputElement && choice === "" ? false : true
  );

  function handleChange(event) {
    const value = event.target.value;
    setValidInput(value === "" ? false : true);
    props.onChange(props.name, value, undefined, undefined);
    setChoice(value);
    // console.log(validInput);
  }

  return (
    <div className="">
      <label className="form-label text-light mt-2">
        {props.text}
        {inputElement && !validInput && (
          <span className="pt-2 mb-0 bright">
            {" "}
            [ {inputElement.validationMessage} ]
          </span>
        )}
      </label>
      <select
        className="form-select"
        name={props.name}
        value={props.value ? props.value : choice}
        ref={inputRef}
        onChange={handleChange}
        required
      >
        <option value="">Select...</option>
        {props.items &&
          props.items.map((item) => {
            return (
              <option
                value={
                  props.name === "userType" ? item.name : JSON.stringify(item)
                }
                key={item.id}
              >
                {item.name}
              </option>
            );
          })}
      </select>
      {props.addButton && (
        <div className="col-sm-12 pt-3">
          <button
            type="submit"
            className="btn col-8 btn-outline-dark fw-bold"
            onClick={(event) => {
              event.preventDefault();
              validInput && navigate("/register");
            }}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}

export default Select;
