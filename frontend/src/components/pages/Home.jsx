import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Slideshow from "../Slideshow";
import useFetch from "../utilities/useFetch";
import Quote from "../Quote";

function Home(props) {
  const { data, isPending, error } = useFetch(
    "/users/type/musician"
  );
  const navigate = useNavigate();

  return (
    <div className="row d-flex justify-content-center align-item-center mb-5">
      <div className="my-3 text-center">
        <h1 className="display-5 fw-semibold bright">
          Welcome to Musician Connect!
        </h1>
        <h4 className="fs-5 px-4 fw-semibold display-6 text-info h5">
          The best musicians in Abuja at your fingertips
        </h4>
      </div>
      <div className="col-12 d-flex justify-content-center px-5">
        <img src="/images/Outdoor_Band.jpg" alt="..." className="img-fluid" />
      </div>
      <div className="">
        <div className="row pt-3">
          <Quote
            bg="bg-secondary"
            textColor="#FFC6D3"
            text="Surprise your loved ones with live music"
          />
          <Quote
            bg="bg-info"
            textColor="#183A1D"
            text="Spice up your events with your desired sound"
          />
          <Quote
            bg="bg-success"
            textColor="#E8F6EF"
            text="Collaborate with fellow musicians in town"
          />
          <Quote
            bg="bg-dark"
            textColor="#E8AA42"
            text="Find a reheasal buddy to keep you motivated"
          />
        </div>
      </div>

      <div className="col-md-6 col-sm-9">
        <h4 className="text-info text-center display-5 fw-semibold mt-5 mb-3">Featured Users</h4>
        <div className="carousel-container bg-secondary p-0 mt-3 w-75">
          {data && <Slideshow data={data} />}
          {isPending && <h3>Loading...</h3>}
          {error && <h4>{error}</h4>}
        </div>
        {/* {props.loggedIn && props.loggedInUser.userType !== 'Musician' && */}
        <div className="pt-5 mt-3 col-12 text-center">
          <button
            type="submit"
            // style={{
            //     backgroundColor: "#68BDE1",
            //     // maxWidth: "40rem"
            // }}
            className="btn btn-lg btn-info bg-info anime col-9 mb-3"
            onClick={() => {
              props.loggedIn
                ? navigate("users/musicians")
                : navigate("/register/user-type");
            }}
          >
            Get Started
          </button>
        </div>
      </div>
      {/* } */}
    </div>
  );
}

export default Home;
