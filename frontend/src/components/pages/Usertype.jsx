import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Select from "../form_pieces/Select";

function Usertype() {
    const navigate = useNavigate();

    return (
        <form className='row g-3 mx-5'>
            <Select name="userType" items={['Client', 'Musician']}
                text="Account Type"
            // onComplete={retrieveInput}
            />
            <div className="col-12">
                <button 
                type="submit"
                className="btn col-4"
                onClick={() => {
                    navigate("/register");
                }}
                >Confirm</button>
            </div>
        </form>
    )
}

export default Usertype;
