import { useState } from "react";
import Home from "./pages/Home";
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './pages/Register';
import Usertype from './pages/Usertype';


function App() {
  const [userData, setUserData] = useState({});

  function retrieveInput(key, value) {
    // console.log(userData);
    setUserData((prevData) => {
      return {
        ...prevData,
        [key]: value
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
