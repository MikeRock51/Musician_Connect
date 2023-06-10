import { useState } from "react";
import Home from "./pages/Home";
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Register from './pages/Register';
import Usertype from './pages/Usertype';
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Footer from "./Footer";
import Musicians from "./pages/Musicians";
import User from "./User";
import Booking from "./pages/Booking";


function App() {
  const [userData, setUserData] = useState({});
  let [userInstruments, setUserInstruments] = useState([]);
  let [isValid, setIsValid] = useState(false);
  const [booking, setBooking] = useState({});
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  const [loggedIn, setLoggedIn] = useState(loggedInUser ? true : false);
  // console.log(loggedInUser);
  // let [loginData, setLoginData] = useState(null);

  function retrieveBookingData(key, value, kwargs = null, validData = false) {
    if (validData === undefined && value.length > 1) {
      setIsValid(true);
      isValid = true;
    } else {
      setIsValid(validData)
      isValid = validData;
    }
    !kwargs ? setBooking((prevData) => {
      return {
        ...prevData,
        [key]: value,
      }
    }) :
      setBooking({ ...kwargs });
  }

  function retrieveInput(key, value, isChecked = false, validData = undefined) {
    if (validData === undefined && value.length > 1 ||
      key === 'instruments') {
      setIsValid(true);
      isValid = true;
    } else {
      setIsValid(validData)
      isValid = validData;
    }
    key === 'instruments' && isChecked && userInstruments.push(value);
    if (key === 'instruments' && !isChecked) {
      userInstruments = userInstruments.filter((val) => {
        return val.id !== value.id;
      });
      setUserInstruments(userInstruments);
    }

    setUserData((prevData) => {
      return {
        ...prevData,
        [key]: key === 'instruments' ? userInstruments : value
      }
    });
  }

  let prevScrollPos = window.pageYOffset;

  window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;

    if (window.location.pathname === '/users/musicians') {
      if (prevScrollPos > currentScrollPos) {
        document.querySelector(".nav-container").classList.remove("navbar-scroll-up");
        document.querySelector(".nav-container").classList.add("navbar-scroll-down");

        document.querySelector("div.fixed-bottom").classList.remove("footer-scroll-up");
        document.querySelector("div.fixed-bottom").classList.add("footer-scroll-down");
      } else {
        document.querySelector(".nav-container").classList.remove("navbar-scroll-down");
        document.querySelector(".nav-container").classList.add("navbar-scroll-up");

        document.querySelector("div.fixed-bottom").classList.add("footer-scroll-up");
        document.querySelector("div.fixed-bottom").classList.remove("footer-scroll-down");
      }

      prevScrollPos = currentScrollPos;
    };
  }

  return (
    <Router>
      <div className='App'>
        <div className="mb-5 pb-5">
          <div className='nav-container container-fluid rounded pe-0 fixed-top'>
            <Navbar
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          </div>
        </div>
        <Routes>
          <Route path='/' element={<Home
            loggedIn={loggedIn}
            loggedInUser={loggedInUser}
            setLoggedIn={setLoggedIn}
          />} />
          <Route path='/register/user-type'
            element={<Usertype onChange={retrieveInput} />}
          />
          <Route path='/register'
            element={<Register
              userData={userData}
              isValid={isValid}
              onChange={retrieveInput}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />} />
          <Route path='/sign-in'
            element={<Signin
              onChange={retrieveInput}
              userData={userData}
              isValid={isValid}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />} />
          <Route path='/user/dashboard'
            element={<Dashboard
              userInfo={loggedInUser}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />} />
          <Route path='/users/musicians'
            element={<Musicians
              sendBookingInitials={retrieveBookingData}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              loggedInUser={loggedInUser}
            />} />

          <Route path='/users/musicians/:id'
            element={<User
              loggedInUser={loggedInUser}
              loggedIn={loggedIn}
            />} />

          <Route path='/booking'
            element={<Booking
              bookingData={booking}
              onChange={retrieveBookingData}
              isValid={isValid}
              loggedInUser={loggedInUser}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />} />
        </Routes>
        <div className='mt-5 pt-5'>
          <Footer />
        </div>
      </div>
    </Router>
  );
}
export default App;
