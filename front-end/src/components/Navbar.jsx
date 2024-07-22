export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-primary">
          <div className="container-fluid px-5 d-flex align-items-center justify-content-between">
              <img src="/public/imgs/UNISHARElogo.png" alt="Logo" height="34" className="d-inline-block align-text-top me-2"/> {/* Add margin to the right of the image */}
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
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
              <ul className="navbar-nav mb-2 mb-lg-0 fs-5">
                <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Disciplinas</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Upload</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Perfil</a></li>
              </ul>
            </div>
          </div>
        </nav>
      );
}
