import Navbar from "../Navbar";
import Select from "../form_pieces/Select";

function Usertype(props) {

    return (
        <form className='row g-3 mx-5'>
            <Select name="userType"
                items={[{ 'name': 'Client', 'id': 1 }, { "name": 'Musician', 'id': 2 }]}
                text="Account Type"
                onChange={props.onChange}
                addButton={true}
            />
        </form>
    )
}

export default Usertype;
