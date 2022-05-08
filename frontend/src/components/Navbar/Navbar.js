import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" >Project Manager</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <Link to="/signup">
                            <li className="nav-item">
                                <a className="nav-link">Signup</a>
                            </li>
                            </Link>
                            <Link to="/">
                            <li className="nav-item">
                                <a className="nav-link">Login</a>
                            </li>
                            </Link>
                            <Link to="/createtask">
                                <li className="nav-item">
                                    <a className="nav-link">CreateTask</a>
                                </li>
                            </Link>

                            <Link to="/charts">
                                <li className="nav-item">
                                    <a className="nav-link">charts</a>
                                </li>
                            </Link>


                            <Link to="/projectdetails">
                                <li className="nav-item">
                                    <a className="nav-link">Details</a>
                                </li>
                            </Link>

                            <Link to="/projects">
                                <li className="nav-item">
                                    <a className="nav-link">Projects</a>
                                </li>
                            </Link>

                            <Link to="/joinproject">
                                <li className="nav-item">
                                    <a className="nav-link">JoinProject</a>
                                </li>
                            </Link>

                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Logout
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item">Logout</a></li>
                                </ul>
                            </li> */}
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}


export default Navbar;