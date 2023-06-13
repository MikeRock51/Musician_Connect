import { useState } from "react";
import Input from "../form_pieces/Input";
import Select from "../form_pieces/Select";
import Checklist from "../form_pieces/Checklist";
import useFetch from "../utilities/useFetch";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const statesUrl = "http://127.0.0.1:7000/api/v1/states";
  const { data: states } = useFetch(statesUrl);
  const cities =
    props.userData.state && JSON.parse(props.userData.state).cities;
  const navigate = useNavigate();

  // POST DATAs
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  let [error, setError] = useState(null);
  let [verified, setVerified] = useState(false);

  function postIt(url, jsonData) {
    // POST datas
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost/3000",
      },
      body: JSON.stringify(jsonData),
    })
      .then((res) => {
        if (!res.ok) {
          // console.log(res.json());
          // throw Error("Failed to create your account");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }

  function duplicateObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function handleClicked(event) {
    event.preventDefault();
    const userData = duplicateObject(props.userData);

    // Parse city & instrument data
    for (let key in userData) {
      if (key === "city" || key === "state") {
        const id = key + "_id";
        userData[id] = JSON.parse(userData[key]).id;
        delete userData[key];
      }
      if (key === "instruments") {
        const instrumentIds = userData[key].map((instrument) => {
          return instrument.id;
        });
        userData[key] = instrumentIds;
      }
    }
    handleSubmit(userData);
    // props.isValid && handleSubmit();
    // !props.isValid && alert(
    //     'One or more invalid responses, please check and try again...')
  }

  function handleSubmit(userData) {
    const userPostUrl = "http://192.168.43.248:7000/api/v1/users";
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "city_id",
      "userType",
      "phone",
      "password",
    ];

    //   Verify that password and confirm password fields match
    if (userData.password !== userData.confirmPassword) {
      setError(true);
      error = true;
      setVerified(false);
      verified = false;
      return;
    } else {
      setError(null);
      error = null;
      setVerified(true);
      verified = true;
      console.log("Passed");
    }

    //   console.log(userData);

    // Verify that all required fields are present and not empty
    for (let field of requiredFields) {
      if (!userData[field] || userData[field].length < 1) {
        console.log(field + ": " + userData[field]);
        setVerified(false);
        verified = false;
        setError(true);
        error = true;
        return;
      } else {
        setError(null);
        error = null;
        setVerified(true);
        verified = true;
      }
    }

    if (verified) {
        console.log("Success");
      postIt(userPostUrl, userData);
      !isPending && !error && navigate("/sign-in");
      error && console.log(error);
    } else {
      alert("Please fill all required fields");
    }
  }

  return (
    <div className="container-md">
      {error && !verified && (
        <div
          className="alert alert-danger alert-dismissible fade show text-center fixed-top mt-5"
          role="alert"
        >
          <strong className="">
            One or more invalid responses, please check and try again...
          </strong>
          <button
            type="button"
            className="btn-close pe-3"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <form className="row g-3 mx-2">
        <div
          className={
            props.userData.userType === "Client" ? "col-md-12" : "col-md-6"
          }
        >
          <Select
            name="userType"
            items={[
              { name: "Client", id: 1 },
              { name: "Musician", id: 2 },
            ]}
            text="Account Type"
            onChange={props.onChange}
            value={props.userData.userType}
          />
        </div>
        {props.userData.userType === "Musician" && (
          <Checklist
            onChange={props.onChange}
            name="instruments"
            checkedItems={props.userData.instruments}
            lenCheckedItems={
              props.userData.instruments && props.userData.instruments.length
            }
          />
        )}
        <div className="col-md-6">
          <Input
            type="text"
            name="firstName"
            text="First Name"
            mandatory={true}
            onChange={props.onChange}
          />
        </div>
        <div className="col-md-6">
          <Input
            type="text"
            name="lastName"
            text="Last Name"
            mandatory={true}
            onChange={props.onChange}
          />
        </div>
        <div className="col-md-6">
          <Input
            type="email"
            name="email"
            text="Email"
            mandatory={true}
            onChange={props.onChange}
          />
        </div>
        <div className="col-md-6">
          <Input
            type="tel"
            name="phone"
            text="Phone Number"
            mandatory={true}
            onChange={props.onChange}
            pattern="^\+?[0-9\s-]+$"
          />
        </div>
        <div className="col-md-6">
          <Input
            type="password"
            name="password"
            text="Password"
            mandatory={true}
            onChange={props.onChange}
          />
        </div>
        <div className="col-md-6">
          <Input
            type="password"
            name="confirmPassword"
            text="Confirm Password"
            pwd={props.userData.password}
            mandatory={true}
            onChange={props.onChange}
          />
        </div>
        <div className="col-md-6">
          <Select
            name="state"
            items={states}
            text="State"
            onChange={props.onChange}
          />
        </div>
        <div className="col-md-6">
          <Select
            name="city"
            items={cities}
            onChange={props.onChange}
            text="City"
          />
        </div>
        {props.userData.userType === "Musician" && (
          <Input
            type="text"
            name="alias"
            text="Alias"
            mandatory={false}
            onChange={props.onChange}
          />
        )}
        {props.userData.userType === "Musician" && (
          <Input
            type="text"
            name="price_by_hour"
            text="Price Per Hour"
            mandatory={true}
            onChange={props.onChange}
          />
        )}

        <Input
          name="description"
          id={props.userData.id && props.userData.id}
          text="Write a brief description about yourself:"
          onChange={props.onChange}
        />

        {/* <div className="mb-3 col-lg-6">
                <label className="form-label">Upload profile picture:</label>
                <input type="file" className="form-control form-control"
                    id="formFileSm" name="profilePicture" accept="image/*"
                    onChange={(event) => {
                        props.onChange(event.target.name, event.target.value);
                    }}
                    enctype="multipart/form-data"
                />
            </div> */}
        <div className="col text-center mx-auto">
          <button
            type="submit"
            className="btn btn-outline-danger fw-bold w-100 mb-3"
            onClick={handleClicked}
          >
            {!isPending && "Create my account"}
            {isPending && "Creating your account..."}
          </button>
          <p className="text-light">
            Already have an account?
            <a
              href="/sign-in"
              className="link-underline link-underline-opacity-0 hover bright"
            >
              {" "}
              Sign In here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
