import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure the Bootstrap Icons are imported
import '../../components/custom.scss'; // Ensure the path is correct

export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    useEffect(() => {
        const form = document.querySelectorAll('.needs-validation');

        Array.from(form).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');
            }, false);
        });
    }, []);

    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-custom">
                <form className="needs-validation" noValidate>
                    <div className="login-box p-5">
                        <h1 className="mb-4 text-center">Faz o teu login</h1>
                        <div className="mb-3">
                            <h3>Email address</h3>
                            <input className="form-control custom-input" type="email" placeholder="name@mail.com" required />
                            <div className="invalid-feedback"><p>Email inválido</p></div>
                        </div>
                        <div className="mb-1">
                            <h3>Password</h3>
                            <div className="input-group position-relative">
                                <input
                                    className="form-control custom-input"
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder="●●●●●●●●●"
                                    required
                                />
                                <button
                                    className="btn btn-outline-secondary toggle-password"
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                >
                                    <i className={passwordVisible ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                                </button>
                                <div className="invalid-feedback"><p>Password inválida</p></div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end"><a className="link-primary" href="linkrecpass">Recuperar password</a></div>
                        <div className="d-flex justify-content-between mt-4">
                            <button className="btn btn-primary" type="submit">Login</button>
                            <button className="btn btn-secondary">
                                <a className="text-white text-decoration-none" href="">Registar</a>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
