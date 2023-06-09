import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { useNavigate } from 'react-router-dom';

function Navbar(props) {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg mb-4">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
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
                            <a className="nav-link active hover" aria-current="page"
                                href={props.loggedIn ? "/users/musicians" : "/sign-in"}>
                                Musicians
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link hover"
                                onClick={() => {
                                    if (props.loggedIn) {
                                        sessionStorage.clear()
                                        props.setLoggedIn(false);
                                        navigate('/sign-in')
                                    }
                                }}
                                href="/sign-in">
                                {props.loggedIn ? "Sign out" : "Sign in"}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
