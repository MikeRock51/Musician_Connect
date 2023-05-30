import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Navbar from "./Navbar";
import Slideshow from './Slideshow';
import { useState } from 'react';

function App() {
  const [slideData, setSlideData] = useState([{
    "imageUrl": "https://scontent.fabv2-1.fna.fbcdn.net/v/t1.6435-9/127536440_680998232855827_8401588747317748180_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG7uHj-jxQnxeprZYwHZoKp5FiR_Ra_NpjkWJH9Fr82mLQxOhcV1FZyNErOGI8c5yK8aLTlx7S3tN6hruuEM7I4&_nc_ohc=-cntwUr1u6cAX-ROQ-Z&_nc_oc=AQkTqGTR3v_O5lim_c3LK2zH3t06Q7bkHr8_f2OifQ3PqKw0-z4M7jozYfMww7Z5IkQ&_nc_ht=scontent.fabv2-1.fna&oh=00_AfASiNiWyjwb4jpGRz8_LTnica17dRIlQAkwaylFKaXK8Q&oe=649D5465",
    "name": "Michael Adebayo",
    "instruments": ["Guitar", "Piano", "Voice"],
    "city": "Dutse-Alhaji"
  }, {
    "imageUrl": "https://avatars.githubusercontent.com/u/111021729?v=4",
    "name": "Michael Olasunkanmi",
    "instruments": ["Piano", "Violin", "Drums"],
    "city": "Gwarinpa"
  }, {
    "imageUrl": "https://lh3.googleusercontent.com/ogw/AOLn63EIdidZfdc_I9RNUE7EpINxl-OgPw16WRJIx2RB=s32-c-mo",
    "name": "Mike Rock",
    "instruments": ["Cello", "Tuba", "Producer"],
    "city": "Katampe Extension"
  }])

  return (
    <div className="App">
      <Navbar />
      <div className='my-5 text-center'>
        <h1 className='display-4 teal'>Welcome to Musician Connect!</h1>
        <h4 className='cinnabar'>The best musicians of Abuja at your fingertips</h4>
      </div>
      <div className="carousel-container">
        <Slideshow 
        data={slideData}
        />
      </div>
    </div>
  );
}

export default App;
