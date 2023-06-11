import React from "react";
import { useState } from "react";
import useFetch from "../utilities/useFetch";

function Checklist(props) {
    const url = 'http://127.0.0.1:7000/api/v1/instruments';
    const { data: instruments, isPending, error: fetchError } = useFetch(url);

    function handleCheck(event) {
        // const instrument = JSON.parse(event.target.value);
        const instrument = JSON.parse(event.target.getAttribute('data-instrument'));
        // console.log(instrument.name);
        const isChecked = event.target.checked;

        props.onChange(props.name, instrument, isChecked, undefined);
    }

    return (
        <div className="dropdown col-md-6">
            <label className="pb-2 text-light">Instruments Played: [
                {props.checkedItems && props.checkedItems.map((instrument, index) => {
                    instrument = instrument;
                    return (
                        <React.Fragment key={index}>
                            {instrument.name}
                            {index < props.checkedItems.length - 1 && ", "}
                        </React.Fragment>
                    );
                })}
                {props.lenCheckedItems === 0 && <span className="pt-2 mb-0 bright"> Please select at least one instrument </span>}
                ]</label>
            <button className="btn dropdown-toggle btn-info col-12" type="button"
                id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                Select options (Primary instrument first)
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {instruments && instruments.map((instrument) => {
                    return (
                        <li key={instrument.id} className="px-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox"
                                    // value={JSON.stringify(instrument)}
                                    value={instrument.name}
                                    data-instrument={JSON.stringify(instrument)}
                                    key={instrument.id} name={props.name}
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
        </div>

    )
}

export default Checklist;
