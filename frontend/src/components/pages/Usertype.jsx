import Navbar from "../Navbar";
import Select from "../form_pieces/Select";

function Usertype(props) {
  return (
    <div className="container-lg text-center">
      <form className="row g-3 mx-5 d-flex justify-content-center">
        <div className="col-lg-6">
          <Select
            name="userType"
            items={[
              { name: "Client", id: 1 },
              { name: "Musician", id: 2 },
            ]}
            text="Account Type"
            onChange={props.onChange}
            addButton={true}
          />
        </div>
      </form>
    </div>
  );
}

export default Usertype;
