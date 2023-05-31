import Navbar from "../Navbar";
import Slideshow from "../Slideshow";
import useFetch from "../useFetch";

function Home() {
    const { data, isPending, error } = useFetch('http://127.0.0.1:7000/api/v1/users/type/musician');

    return (
        <div>
            <div className='my-5 text-center'>
                <h1 className='display-4 teal'>Welcome to Musician Connect!</h1>
                <h4 className='cinnabar h5'>The best musicians in Abuja at your fingertips</h4>
            </div>
            <div className="carousel-container">
                {data && <Slideshow data={data} />}
                {isPending && <h3>Loading...</h3>}
                {error && <h4>{error}</h4>}
            </div>
        </div>
    )
}

export default Home;
