import Navbar from "../Navbar";
import Select from "../form_pieces/Select";

function Usertype() {
    return (
        <form className='row g-3 mx-5 middle'>
            <Select name="userType" items={['Client', 'Musician']}
                text="Account Type"
            // onComplete={retrieveInput}
            />
            <div className="col-12">
                <button type="submit" className="btn col-4">Confirm</button>
            </div>
        </form>
    )
}

export default Usertype;
