import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function User(props) {
  const user = props.musician
    ? props.musician
    : JSON.parse(sessionStorage.getItem("openUser"));
  const navigate = useNavigate();

  return (
    <div className="container-sm text-center text-sm-start mb-5">
      <div className="d-flex justify-content-center align-items-center">
        <div className="card mb-3 text-bg-dark brownShadow w-75">
          <div className="row g-2">
            <div className="text-center bg-secondary col-md-4 lightShadow">
              <img
                src={user.profilePicture}
                className="img-fluid rounded-4 shadow-lg w-75 py-1"
                alt="Musician DP"
              />
              {props.loggedInUser &&
              props.loggedInUser.userType.toLowerCase() === "client" ? (
                <button
                  type="button"
                  className="w-100 anime btn bg-bright cinnabar fw-bold"
                  onClick={() => {
                    props.sendBookingInitials(null, null, {
                      musician_id: user.id,
                      client_id: JSON.parse(
                        sessionStorage.getItem("loggedInUser")
                      ).id,
                    });
                    navigate("/booking");
                  }}
                >
                  Book Now
                </button>
              ) : (
                <div className="row d-flex justify-content-center">
                  <button
                    type="button"
                    className="col-6 mb-1 anime btn bg-success text-light fw-bold"
                    onClick={() => {
                      navigate("/user/dashboard");
                    }}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="ms-2 col-4 mb-1 btn bg-danger text-light fw-bold"
                    onClick={() => {
                      navigate("/user/dashboard");
                    }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
            <div className="col-md-8 px-2">
              <div className="card-body">
                <div className="nameLocation text-nowrap row pb-0">
                  <h5 className="card-title bright col-sm-7 col-md-5 mb-0 mr-2">
                    {`${user.firstName} ${user.lastName}`}
                  </h5>
                  <FontAwesomeIcon
                    className="col-sm-1 col-2 mt-1 p-0 text-danger"
                    icon={faLocationDot}
                    style={{ color: "#ECFFB0" }}
                  />
                  <h6 className="col-sm-4 col-3 p-0 m-0 mt-1 bright">
                    {user.city}
                  </h6>
                  <p className="col-md-5 col-sm-7 m-0 pb-1 text-secondary">
                    a.k.a {user.alias && user.alias}
                  </p>
                  <p className="col-sm-5 pl-0 ml-0">
                    {[1, 2, 3, 4, 5].map((i) => {
                      return (
                        <FontAwesomeIcon
                          icon={faStar}
                          key={i}
                          style={{
                            color: i <= user.rating ? "#cff250" : "grey",
                          }}
                        />
                      );
                    })}
                  </p>
                </div>
                {user.userType.toLowerCase() === "musician" && (
                  <div className="ms-2 ">
                    <div className="row text-nowrap">
                      {user.instruments.map((instrument, index) => {
                        return (
                          <h6
                            className={
                              index === 0
                                ? "col-sm-6 col-lg-5 text-bg-success"
                                : "col-sm-6 col-lg-5 text-info"
                            }
                            key={instrument.id}
                          >
                            {`[ ${instrument.name} ]`}
                          </h6>
                        );
                      })}
                    </div>
                  </div>
                )}
                <p className="card-text fw-light bright mb-0 lh-sm">
                  {user.description}
                </p>
                <p className="card-text text-center text-lg-start mt-3">
                  <small className="text-light p-1 rounded text-bg-success">
                    {
                      user.bookings.filter((booking) => {
                        return booking.completed;
                      }).length
                    }{" "}
                    Bookings Completed
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
