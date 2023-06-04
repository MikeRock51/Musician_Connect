import { useState } from "react";
import Home from "./pages/Home";
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './pages/Register';
import Usertype from './pages/Usertype';


function App() {
  const [userData, setUserData] = useState({});
  const [userInstruments, setUserInstruments] = useState([]);

  function retrieveInput(key, value, isChecked = false) {
    key === 'instruments' && isChecked && userInstruments.push(value);
    key === 'instruments' && !isChecked && setUserInstruments((prevValue) => {
          return prevValue.filter((val) => {
              return val.id !== value.id;
          })});

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
              // state={userData.state ? userData.State : null}
              onChange={retrieveInput}
            />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
