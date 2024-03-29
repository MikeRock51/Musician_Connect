import { useNavigate } from "react-router-dom";
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
          Bridging the gap between music professionals and their clients.
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
            text="Find a rehearsal buddy to keep you motivated"
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
        <div className="pt-5 mt-2 col-12 text-center">
          <button
            type="submit"
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
      <div className="text-center mt-4 mb-5 px-5 py-3 bg-light col-10">
        <h3 className="brownie fw-semibold">About Musician Connect</h3>
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
        <h4 className="brownie fw-semibold text-start">The Team</h4>
        <h5 className="text-start lh-1">Michael Adebayo</h5>
        <h6 className="text-start brownie">Full-Stack Developer</h6>
        <p className="text-dark text-start">
          Michael was solely responsible for building the application. As a
          full-stack developer, he worked on the backend, implemented the
          application api, and also the frontend/UI of the application. As the
          only team member, he was also responsible for the deployment and
          hosting of the web application.
        </p>
      </div>
    </div>
  );
}

export default Home;
