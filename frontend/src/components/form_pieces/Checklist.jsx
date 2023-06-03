import React from "react";
import { useState } from "react";
import useFetch from "../utilities/useFetch";

function Checklist(props) {
    const [userInstruments, setUserInstruments] = useState([]);
    const url = 'http://127.0.0.1:7000/api/v1/instruments';
    const { data: instruments, isPending, error: fetchError } = useFetch(url);
    const [error, setError] = useState(true);

    function handleCheck(event) {
        const value = event.target.value;
        const isChecked = event.target.checked;
        const name = event.target.name;

        isChecked && setUserInstruments((prevValue) => {
            return [...prevValue, value];
        });
        !isChecked && setUserInstruments((prevValue) => {
            return prevValue.filter((val) => {
                return val !== value;
            });
        });
        setError(userInstruments.length < 2 ? true : false);
        props.onChange(name, userInstruments);
    }

    return (
        <div className="dropdown col-md-6">
            <label className="pb-2">Instruments Played: [ 
                {userInstruments.map((instrument, index) => {
                    instrument = JSON.parse(instrument);
                    return (
                        <React.Fragment key={index}>
                            {instrument.name}
                            {index < userInstruments.length - 1 && ", "}
                        </React.Fragment>
                    );
                })}
                 ]</label>
            <button className="btn dropdown-toggle btn-info col-12" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                Select options (Primary instrument first)
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {instruments && instruments.map((instrument) => {
                    return (
                        <li key={instrument.id} className="px-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox"
                                    value={JSON.stringify(instrument)}
                                    id={instrument.id} name='instruments'
                                    onChange={handleCheck} required />
                                <label className="form-check-label" htmlFor={instrument.id}>
                                    {instrument.name}
                                </label>
                            </div>
                        </li>
                    )
                })
                }
            </ul>
            {error && <h6 className="pt-2 cinnabar">Please select at least one instrument</h6>}
        </div>

    )
}

export default Checklist;
