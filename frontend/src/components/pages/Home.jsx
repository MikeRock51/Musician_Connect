import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Slideshow from "../Slideshow";
import useFetch from "../utilities/useFetch";
import Quote from "../Quote";

function Home(props) {
  const { data, isPending, error } = useFetch("/users/type/musician");
  const navigate = useNavigate();

  return (
    <div className="row d-flex justify-content-center align-item-center mb-5">
      <div className="my-3 text-center">
        <h1 className="display-5 fw-semibold bright">
          Welcome to Musician Connect!
        </h1>
        <h4 className="fs-5 px-4 fw-semibold display-6 text-light h5">
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
        <h4 className="text-info text-center display-5 fw-semibold mt-5 mb-3">
          Featured Users
        </h4>
        <div className="carousel-container bg-secondary p-0 mt-3 w-75">
          {data && <Slideshow data={data} />}
          {isPending && <h3>Loading...</h3>}
          {error && <h4>{error}</h4>}
        </div>
        {/* {props.loggedIn && props.loggedInUser.userType !== 'Musician' && */}
        <div className="pt-5 mt-2 col-12 text-center">
          <button
            type="submit"
            // style={{
            //     backgroundColor: "#68BDE1",
            //     // maxWidth: "40rem"
            // }}
            className="btn btn-lg btn-info bg-info anime col-9 col-sm-12 mb-3"
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
      <div className="text-center mt-4 px-5 py-3 bg-light col-10">
        <h4 className="brownie fw-semibold">About Musician Connect</h4>
        <p className="text-dark text-start">
          Musician Connect is an online platform to help people who are in need
          of skilled musicians connect with them. Musicians get to register for
          a public profile on the platform, where their skill set is on display
          for potential clients to see. Likewise, it will help clients who are
          in need of musical services easily find what they are looking for, as
          well as connect fellow musicians for social and developmental events.
          As a musician myself, I thought a platform like this would be valuable
          to both musicians and clients. Because it provides a platform to
          showcase the musicians, while also making it easier for clients to
          access the unique services and talent of every musician around their
          city.
        </p>
      </div>
    </div>
  );
}

export default Home;
