
function Input(props) {

    return (
        <div className="col-md-6">
            <label className="form-label">{props.text}</label>
            <input
                type={props.type}
                name={props.name}
                className="form-control"
                placeholder={props.name === 'price_by_hour' ? 'How much do you charge per hour?' : props.text}
                required={props.mandatory ? true : false}
                
                onChange={(event) => {
                    props.onChange(event.target.value);
                    console.log(props.value);
                }}
                />
        </div>
    )
}

export default Input;
