import { useState } from "react";
import Home from "./pages/Home";
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './pages/Register';
import Usertype from './pages/Usertype';
import Signin from "./pages/Signin";

function App() {
  const [userData, setUserData] = useState({});
  let [userInstruments, setUserInstruments] = useState([]);
  const [isValid, setIsValid] = useState(false);

  function retrieveInput(key, value, isChecked = false, validData = undefined) {
    // console.log(userData);
    validData === undefined ? setIsValid(true) : setIsValid(validData);
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

  return (
    <Router>
      <div className='App'>
        <div className='nav-container container-fluid'>
          <Navbar />
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register/user-type'
            element={<Usertype onChange={retrieveInput} />}
          />
          <Route path='/register'
            element={<Register
              userData={userData}
              isValid={isValid}
              onChange={retrieveInput}
            />} />
          <Route path='/sign-in'
            element={<Signin
              onChange={retrieveInput}
            />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
