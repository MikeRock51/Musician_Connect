import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Home from "./pages/Home";
import Navbar from './Navbar';
import Signup from "./pages/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='nav-container container-fluid'>
          <Navbar />
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
