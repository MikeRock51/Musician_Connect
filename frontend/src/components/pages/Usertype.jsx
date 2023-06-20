import Select from "../form_pieces/Select";

function Usertype(props) {
  return (
    <div className="container-sm text-center bg-info bg-opacity-25 rounded-3">
      <form className="row g-3 mx-2 d-flex justify-content-center my-auto pb-5 pt-2">
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
