import { useState, useEffect } from "react";

export default function Registar(){
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
                <form className="needs-validation" noValidate method="POST" action="http://localhost:3000/api/v1/auth/register">
                    <div className="login-box p-5">
                        <h1 className="mb-4 text-center h3">Cria a tua conta</h1>
                        <div className="d-flex justify-content-between">
                            <div className="input-nome mb-3" >
                                <label className="h5">Primeiro nome</label>
                                <input className="form-control custom-input" name="firstName" type="text" placeholder="Nome" required />
                                <div className="invalid-feedback"><p>Nome inválido</p></div>
                            </div>
                            <div className="input-nome mb-3">
                                <label className="h5">Ultimo nome</label>
                                <input className="form-control custom-input" name="lastName" type="text" placeholder="Nome" required />
                                <div className="invalid-feedback"><p>Nome inválido</p></div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="h5">Username</label>
                            <input className="form-control custom-input" name="username" type="text" placeholder="Nome" required />
                            <div className="invalid-feedback"><p>Nome inválido</p></div>
                        </div>
                        <div className="mb-3">
                            <label className="h5">Email address</label>
                            <input className="form-control custom-input" name="email" type="email" placeholder="name@mail.com" required />
                            <div className="invalid-feedback"><p>Email inválido</p></div>
                        </div>
                        <div className="mb-1">
                            <label className="h5">Password</label>
                            <div className="input-group position-relative">
                                <input
                                    className="form-control custom-input"
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder="●●●●●●●●●"
                                    name="password"
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
                            <button className="btn btn-primary"><a href="/auth/login" className="text-white text-decoration-none">Login</a></button>
                            <button className="btn btn-secondary" type="submit">Registar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}