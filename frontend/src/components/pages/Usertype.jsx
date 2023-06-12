import Navbar from "../Navbar";
import Select from "../form_pieces/Select";

function Usertype(props) {
  return (
    <div className="container-sm text-center">
      <form className="row g-3 mx-2 d-flex justify-content-center my-auto">
        <div className="">
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
