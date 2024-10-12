import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure the Bootstrap Icons are imported
import '../../components/custom.scss'; // Ensure the path is correct

export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        const formData = new FormData(form);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };
        try {
            const response = await fetch('https://unishare-7vk2.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                const token = result.token;
                localStorage.setItem('token', token);
                window.location.href = '../';
            } else {
                const result = await response.json();
                setErrorMessage(result.message || 'Credenciais erradas');
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('Ocoreu um erro, tente novamente mais tarde.');
        }
    };

    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-custom">
                <form className="needs-validation" noValidate onSubmit={handleFormSubmit}>
                    <div className="login-box p-5">
                        <h1 className="mb-4 text-center">Faz o teu login</h1>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <div className="mb-3">
                            <label className='h5'>Email address</label>
                            <input className="form-control custom-input" type="email" placeholder="name@mail.com" name="email" required />
                            <div className="invalid-feedback"><p>Email inválido</p></div>
                        </div>
                        <div className="mb-1">
                            <label className='h5'>Password</label>
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
                            <button className="btn btn-primary text-black">
                                    <a className="text-white text-decoration-none" href="registar">Registar</a>
                                </button>
                            <button className="btn btn-secondary" type="submit">Login</button>   
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
