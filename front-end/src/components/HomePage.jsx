export default function HomePage() {
    return (
        <main>
            <div className="position-relative">
                <img src="/imgs/homepage-img-small.png" className="img-fluid w-100" alt="Homepage" />
                <div className=" overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white background-transparent ">
                    <h1>Bem-vindos ao <strong>UNISHARE</strong></h1>
                    <p className="h5">A tua plataforma de partilha de material!</p>
                </div>
            </div>
            <div className="row  w-100 m-auto d-flex py-4 justify-content-center">
                <div className="col-12 col-lg-4 d-flex flex-column align-items-center">
                    <img src="/imgs/icons/icon-livro-preto.png" height="70"/>
                    <div>
                        <h2 className="h4">Centro Educacional</h2>
                        <p className="px-1">Encontre e compartilhe materiais de aula sem complicações</p>
                    </div>
                </div>
                <div className="col-12 col-lg-4 d-flex flex-column align-items-center">
                    <img src="/imgs/icons/icon-lupa-preto.png" height="70"/>
                    <div>
                        <h2 className="h4">Ferramenta de pesquisa</h2>
                        <p className="px-1">Pesquise por disciplinas especificas</p>
                    </div>
                </div>
                <div className="col-12 col-lg-4 d-flex flex-column align-items-center">
                    <img src="/imgs/icons/icon-livro-aberto-preto.png" height="70" />
                    <div>
                        <h2 className="h4">Material de estudo</h2>
                        <p className="px-1">Acesso fácil a recursos de estudo</p>
                    </div>
                </div>
            </div>
            <h1>Adicionar mais alguma cena aqui (ns o que)</h1>
        </main>
    );
  }