
export default function RecuperarPass() {

    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-custom">
                <form className="needs-validation" noValidate>
                    <div className="login-box p-5">
                        <h1 className="mb-4 text-center">Confirme a sua conta</h1>
                        <div className="mb-3">
                            <p className="h6">Proceda à confirmação da sua conta, enviamos um link com 1 dia de validade para o seu email</p>
                            <p>A sua conta será apagada caso não proceda à sua confirmação</p>
                        </div>    
                    </div>
                </form>
            </div>
        </>
    );
}