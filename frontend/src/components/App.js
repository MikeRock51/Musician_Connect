import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Navbar from "./Navbar";
import Slideshow from './Slideshow';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='mb-5'>
        <h1 className='display-4'>Welcome to Musician Connect!</h1>
        
      </div>
      <Slideshow />
    </div>
  );
}

export default App;
