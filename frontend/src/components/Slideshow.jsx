import Carousel from 'react-bootstrap/Carousel';
import pictures from '../data/picLinks';

function Slideshow(props) {
  const musicians = props.data;

  return (
    <Carousel variant="dark" className="curvy carousel">
      {musicians.map((musician) => {
        if (!musician.imageUrl) {
          musician.imageUrl = pictures[Math.floor(Math.random() * pictures.length)];
        }
        return (
          <Carousel.Item key={musician.id}>
            <img
              className="d-block w-100"
              src={musician.imageUrl}
              alt={`${musician.firsName} ${musician.lastName}`}
            />
            <Carousel.Caption className="carousel-caption">
              <h6 className='mt-1 pt-3 text-outline'>Meet {musician.firstName} from {musician.city}. Plays {musician.instruments.map((instrument, index) => {
                return index < musician.instruments.length - 1 ? instrument.name + ', ' : 'and ' + instrument.name
              })}</h6>
            </Carousel.Caption>
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

export default Slideshow;
