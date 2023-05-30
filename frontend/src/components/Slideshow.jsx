import Carousel from 'react-bootstrap/Carousel';

function Slideshow() {
  return (
    <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://avatars.githubusercontent.com/u/111021729?v=4"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://lh3.googleusercontent.com/ogw/AOLn63EIdidZfdc_I9RNUE7EpINxl-OgPw16WRJIx2RB=s32-c-mo"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://scontent.fabv2-1.fna.fbcdn.net/v/t1.6435-9/127536440_680998232855827_8401588747317748180_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG7uHj-jxQnxeprZYwHZoKp5FiR_Ra_NpjkWJH9Fr82mLQxOhcV1FZyNErOGI8c5yK8aLTlx7S3tN6hruuEM7I4&_nc_ohc=-cntwUr1u6cAX-ROQ-Z&_nc_oc=AQkTqGTR3v_O5lim_c3LK2zH3t06Q7bkHr8_f2OifQ3PqKw0-z4M7jozYfMww7Z5IkQ&_nc_ht=scontent.fabv2-1.fna&oh=00_AfASiNiWyjwb4jpGRz8_LTnica17dRIlQAkwaylFKaXK8Q&oe=649D5465"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slideshow;
