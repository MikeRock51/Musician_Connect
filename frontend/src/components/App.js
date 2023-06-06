import { useState } from "react";
import Home from "./pages/Home";
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Register from './pages/Register';
import Usertype from './pages/Usertype';
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";


function App() {
  const [userData, setUserData] = useState({});
  let [userInstruments, setUserInstruments] = useState([]);
  let [isValid, setIsValid] = useState(false);
  let [loginData, setLoginData] = useState({});

  function getLoginData(data) {

    loginData = { ...data };
    console.log(loginData);
    // return true
  }

  function retrieveInput(key, value, isChecked = false, validData = undefined) {
    // console.log(userData);
    if (validData === undefined) {
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

  return (
    <Router>
      <div className=''>
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
              userData={userData}
              isValid={isValid}
              sendData={getLoginData}
            />} />
          <Route path='/user/dashboard'
            element={<Dashboard
              userInfo={loginData}
            />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
