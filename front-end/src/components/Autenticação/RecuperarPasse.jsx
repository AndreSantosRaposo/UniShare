import { useState, useEffect } from "react";

export default function RecuperarPass(){

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    useEffect(() => {
        const form = document.querySelectorAll('.needs-validation');
        form.forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                const confirmPasswordInput = form.querySelector('input[name="confirmPassword"]');
                if (newPassword !== confirmNewPassword) {
                    event.preventDefault();
                    event.stopPropagation();
                    confirmPasswordInput.setCustomValidity("Not valid");
                } else {
                    confirmPasswordInput.setCustomValidity("");
                }

                form.classList.add('was-validated');
            }, false);
        });
    }, [newPassword, confirmNewPassword]);

    return(
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-custom">
                <form className="needs-validation" noValidate>
                    <div className="login-box p-5">
                        <h1 className="mb-4 text-center">Recuperar password</h1>
                        <div className="mb-3">
                            <h3 className="h5">Nova-password</h3>
                            <div className="input-group position-relative">
                                <input
                                    className="form-control custom-input"
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder="●●●●●●●●●"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    minLength={6}
                                />
                                <div className="invalid-feedback">Password inválida</div>
                            </div>
                        </div>
                        <div className="mb-1">
                            <h3 className="h5">Confirmar nova-password</h3>
                            <div className="input-group position-relative">
                                <input
                                    className="form-control custom-input"
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder="●●●●●●●●●"
                                    required
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    name="confirmPassword"
                                />
                                <button
                                    className="btn btn-outline-secondary toggle-password"
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                >
                                    <i className={passwordVisible ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                                </button>
                                <div className="invalid-feedback"><p>Passwords não são iguais</p></div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <button className="btn btn-secondary" type="submit">Confirm</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
