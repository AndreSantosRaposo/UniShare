import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

export default function Navbar() {
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
                    <ul className="navbar-nav mb-lg-0 fs-5 ">
                        <li className="nav-item"><Link className="nav-link" to="/cadeiras">Disciplinas</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/upload">Upload</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="#">Perfil</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="#">Contactos</Link></li>
                        <li className="nav-item d-lg-none"><Link className="nav-link" to="/auth/login">Log In</Link></li>
                    </ul>
                </div>
                <div className="d-none d-lg-flex align-items-center">
                    <button className='btn btn-secondary text-tertiary'><a className="nav-link" href="/auth/login">Log In</a></button>
                </div>
            </div>
        </nav>
    );
}
