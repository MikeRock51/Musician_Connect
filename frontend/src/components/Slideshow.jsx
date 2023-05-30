import Carousel from 'react-bootstrap/Carousel';

function Slideshow(props) {
  const musicians = props.data;

  return (
    <Carousel variant="dark">
      {musicians.map((musician, index) => {
        return (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={musician.imageUrl}
            alt="Musician"
          />
          <Carousel.Caption >
            <h6 className='m-1 text-outline'>Meet {musician.name}</h6>
            <h6 className='m-1 text-outline'>From {musician.city}</h6>
            <h6 className='m-1 text-outline'>Plays {musician.instruments.map((instrument, index) => {
              return index < musician.instruments.length - 1 ? instrument + ', ' : instrument
            })}</h6>
          </Carousel.Caption>
        </Carousel.Item>
        )
      })}
    </Carousel>
  )


}

export default Slideshow;
