import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Navbar from "./Navbar";
import Slideshow from './Slideshow';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='my-5 text-center'>
        <h1 className='display-4'>Welcome to Musician Connect!</h1>
        <h4>The best musicians of Abuja at your fingertips</h4>
      </div>
      <div className="carousel-container">
        <Slideshow />
      </div>
    </div>
  );
}

export default App;
