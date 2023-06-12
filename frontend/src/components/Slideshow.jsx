import Carousel from "react-bootstrap/Carousel";
import pictures from "../data/picLinks";

function Slideshow(props) {
  const musicians = props.data;

  return (
    <div className="">
      <Carousel variant="dark" className="curvy carousel">
        {musicians.map((musician) => {
          if (!musician.profilePicture) {
            musician.profilePicture =
              pictures[Math.floor(Math.random() * pictures.length)];
          }
          return (
            <Carousel.Item key={musician.id} className="">
              <img
                className="d-block w-100 bg-info rounded-3 m-0"
                src={musician.profilePicture}
                alt={`${musician.firsName} ${musician.lastName}`}
              />
              <Carousel.Caption className="carousel-caption">
                <h6 className="mt-1 pt-3 fw-semibold text-outline">
                  Meet {musician.firstName} from {musician.city}. Plays{" "}
                  {musician.instruments.map((instrument, index) => {
                    if (
                      index < musician.instruments.length - 1 &&
                      musician.instruments.length - (index + 1) > 1
                    ) {
                      return instrument.name + ", ";
                    } else if (index === musician.instruments.length - 2) {
                      return instrument.name;
                    } else {
                      return " and " + instrument.name + ".";
                    }
                  })}
                </h6>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default Slideshow;
