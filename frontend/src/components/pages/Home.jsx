import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Slideshow from "../Slideshow";
import useFetch from "../utilities/useFetch";

function Home(props) {
    const { data, isPending, error } = useFetch('http://127.0.0.1:7000/api/v1/users/type/musician');
    const navigate = useNavigate();

    return (
        <div className="row d-flex justify-content-center align-item-center">
            <div className='my-3 text-center'>
                <h1 className='display-5 fw-semibold bright'>Welcome to Musician Connect!</h1>
                <h4 className='fs-4 text-light fw-normal h5'>The best musicians in Abuja at your fingertips</h4>
            </div>
            <div className="col-12 d-flex justify-content-center px-5">
                <img src="/images/Outdoor Band.jpg"
                    alt="..." className="img-fluid" />
            </div>
            <div className="" style={{}}>
                <div className="d-flex justify-content-center px-5 pt-5">
                    <blockquote
                        className="col-sm-4 col-lg-3 bg-secondary text-center shadow-text mx-3 display-6 px-3 py-5  "
                        style={{
                            backgroundColor: "#C88EA7",
                            color: "#FFDADA",
                            // width: "40rem"
                        }}
                    >Surprise your loved ones with live music</blockquote>
                    <blockquote
                        className="col-sm-4 col-lg-3 bg-dark text-center shadow-text mx-3 display-6 px-3 py-4"
                        style={{
                            backgroundColor: "#698269",
                            color: "#FFBBBB",
                            // width: "40rem"
                        }}
                    >Spice up your events with your desired sound</blockquote>
                </div>
                <div className="d-flex justify-content-center px-5">
                    <blockquote
                        className="col-sm-4 col-lg-3 bg-dark text-center shadow-text mx-3 display-6 px-3 py-4"
                        style={{
                            backgroundColor: "#698269",
                            color: "#FFBBBB",
                            // width: "40rem"
                        }}
                    >Collaborate with fellow musicians in town</blockquote>
                    <blockquote
                        className="col-sm-4 col-lg-3 bg-secondary text-center shadow-text mx-3 display-6 px-3 py-4"
                        style={{
                            backgroundColor: "#C88EA7",
                            color: "#FFDADA",
                            // maxWidth: "40rem"
                        }}
                    >Find a reheasal buddy to keep you motivated</blockquote>
                </div>
            </div>
            <div className="carousel-container bg-secondary p-0 col-6 col-lg-5 mt-3">
                {data && <Slideshow data={data} />}
                {isPending && <h3>Loading...</h3>}
                {error && <h4>{error}</h4>}
            </div>
            {/* {props.loggedIn && props.loggedInUser.userType !== 'Musician' && */}
            <div className="pt-5 mt-3 col-12 text-center">
                <button type="submit"
                    // style={{
                    //     backgroundColor: "#68BDE1",
                    //     // maxWidth: "40rem"
                    // }}
                    className="btn btn-lg anime col-6 mb-5"
                    onClick={() => {
                        props.loggedIn ? navigate('users/musicians') :
                            navigate('/register/user-type');
                    }}
                >
                    Get Started
                </button>
            </div>
            {/* } */}
        </div>
    )
}

export default Home;
