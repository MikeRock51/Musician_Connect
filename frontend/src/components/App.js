import { useState } from "react";
import Home from "./pages/Home";
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './pages/Register';
import Usertype from './pages/Usertype';


function App() {
  const [userData, setUserData] = useState({});

  function retrieveInput(key, value) {
      setUserData((prevData) => {
          return {
              ...prevData,
              [key]: value
          }

      });
  }

  function handleSubmit(event) {
      // event.preventDefault();
      console.log(userData);
  }

  return (
    <Router>
      <div className='App'>
        <div className='nav-container container-fluid'>
          <Navbar />
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register/user-type' element={<Usertype />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
