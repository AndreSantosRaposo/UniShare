import { useEffect } from "react";


export default function RecuperarPass() {
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
                        <h1 className="mb-4 text-center">Recupere a sua palavra-passe</h1>
                        <div className="mb-3">
                            <h3>Email address</h3>
                            <input className="form-control custom-input" type="email" placeholder="name@mail.com" required />
                            <div className="invalid-feedback">
                                <p>Email inválido</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <button className="btn btn-secondary" type="submit">Enviar link</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

