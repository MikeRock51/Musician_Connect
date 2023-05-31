import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
// import "../index.css";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <h3 className='cinnabar'>Musician Connect</h3>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav ms-auto me-0 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active hover" aria-current="page" href="#">
                                Register
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link hover" href="#">
                                Sign in
                            </a>
                        </li>
                    </ul>
                    {/* <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form> */}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
