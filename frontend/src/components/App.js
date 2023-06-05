import { useState } from "react";
import Home from "./pages/Home";
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './pages/Register';
import Usertype from './pages/Usertype';


function App() {
  const [userData, setUserData] = useState({});
  let [userInstruments, setUserInstruments] = useState([]);

  function retrieveInput(key, value, isChecked = false) {
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

  function handleSubmit(event) {
    // event.preventDefault();
    let verified = false;

    for (let key in userData) {
      if (userData[key].length < 1) {
        alert(`${key} cannot be empty`)
        verified = false;
      } else { verified = true; }
    }

    if (userData.password !== userData.confirmPassword) {
      alert('Password Mismatch');
      verified = true;
    }
    
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
              handleSubmit={handleSubmit}
              // state={userData.state ? userData.State : null}
              onChange={retrieveInput}
            />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
