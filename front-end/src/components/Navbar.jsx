import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') != null);
    const navigate = useNavigate(); // Ensures navigation after logout

    useEffect(() => {
        // This effect checks the local storage every time the component is rendered
        const checkAuth = () => setIsLoggedIn(localStorage.getItem('token') != null);

        window.addEventListener('storage', checkAuth); // Listen for localStorage changes across tabs
        return () => window.removeEventListener('storage', checkAuth); // Clean up the listener
    }, []);

    function handleLogOut() {
        localStorage.removeItem('token'); // Remove token on logout
        setIsLoggedIn(false); // Update state after logout
        navigate('/auth/login'); // Navigate to login page
    }

    return (
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container w-90">
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <img src="/imgs/UNISHARElogo.png" alt="Logo" height="34" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-lg-0 fs-5">
                        <li className="nav-item"><Link className="nav-link" to="/cadeiras">Disciplinas</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/upload">Upload</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={isLoggedIn ? "/profile" : "/auth/login"}>Perfil</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="#">Contactos</Link></li>
                        {isLoggedIn ? (
                            <li className="nav-item d-lg-none d-flex justify-content-center"><button className='nav-link' onClick={handleLogOut}>Log Out</button></li>
                        ) : (
                            <li className="nav-item d-lg-none"><Link className="nav-link" to="/auth/login">Log In</Link></li>
                        )}
                    </ul>
                </div>
                <div className="d-none d-lg-flex align-items-center">
                    {isLoggedIn ? (
                        <button className="btn btn-secondary text-tertiary" onClick={handleLogOut}>Log Out</button>
                    ) : (
                        <button className="btn btn-secondary text-tertiary"><Link className="nav-link" to="/auth/login">Log In</Link></button>
                    )}
                </div>
            </div>
        </nav>
    );
}
