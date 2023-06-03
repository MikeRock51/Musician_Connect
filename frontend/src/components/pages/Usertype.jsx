import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Select from "../form_pieces/Select";

function Usertype(props) {
    const navigate = useNavigate();

    return (
        <form className='row g-3 mx-5'>
            <Select name="userType" items={['Client', 'Musician']}
                text="Account Type"
                onChange={props.onChange}
                addButton={true}
            />
        </form>
    )
}

export default Usertype;
