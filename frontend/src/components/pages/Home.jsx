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
                <h1 className='display-4 teal'>Welcome to Musician Connect!</h1>
                <h4 className='cinnabar h5'>The best musicians in Abuja at your fingertips</h4>
            </div>
            <div className="carousel-container col-6 col-lg-5 mt-3">
                {data && <Slideshow data={data} />}
                {isPending && <h3>Loading...</h3>}
                {error && <h4>{error}</h4>}
            </div>
            <div className="pt-5 mt-4 col-12 text-center">
                <button type="submit"
                    className="btn btn-lg anime col-4"
                    onClick={() => {
                        props.loggedIn ? navigate('/musicians') :
                            navigate('/register/user-type');
                    }}
                >
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default Home;
