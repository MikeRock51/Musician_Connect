import Carousel from 'react-bootstrap/Carousel';

function Slideshow(props) {
  const musicians = props.data;

  return (
    <Carousel variant="dark" className="curvy">
      {musicians.map((musician) => {
        if (!musician.imageUrl) {
          musician.imageUrl = 'https://scontent.fabv2-1.fna.fbcdn.net/v/t1.6435-9/127536440_680998232855827_8401588747317748180_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG7uHj-jxQnxeprZYwHZoKp5FiR_Ra_NpjkWJH9Fr82mLQxOhcV1FZyNErOGI8c5yK8aLTlx7S3tN6hruuEM7I4&_nc_ohc=-cntwUr1u6cAX-ROQ-Z&_nc_oc=AQkTqGTR3v_O5lim_c3LK2zH3t06Q7bkHr8_f2OifQ3PqKw0-z4M7jozYfMww7Z5IkQ&_nc_ht=scontent.fabv2-1.fna&oh=00_AfASiNiWyjwb4jpGRz8_LTnica17dRIlQAkwaylFKaXK8Q&oe=649D5465';
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
                return index < musician.instruments.length - 1 ? instrument.name + ', ' : instrument.name
              })}</h6>
            </Carousel.Caption>
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

export default Slideshow;
