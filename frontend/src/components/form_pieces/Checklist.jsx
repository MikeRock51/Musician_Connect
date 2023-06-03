import { useState } from "react";
import useFetch from "../utilities/useFetch";

function Checklist(props) {
    const [choice, setChoice] = useState([]);
    const [error, setError] = useState('');
    const url = 'http://127.0.0.1:7000/api/v1/instruments';
    const {data: instruments, isPending, error: fetchError} = useFetch(url);

    // console.log(instruments[1].id)

    function handleChange(event) {
        const value = event.target.value;
        setError(value.length === 0 ? true : false);
        props.onChange(props.name, value);
        setChoice(value);
    }

    return (
        <div className="dropdown col-12">
            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                Select options
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {instruments && instruments.map((instrument) => {
                    return (
                        <li key={instrument.id} className="px-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="option1" id="check1" />
                                <label className="form-check-label" htmlFor="check1">
                                    {instrument.name}
                                </label>
                            </div>
                        </li>
                    )
                })
                }
            </ul>
        </div>

    )
}

export default Checklist;
