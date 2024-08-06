export default function DisciplinaCard({ name, year, semester, category }) {
    let image;
    switch (category) {
        case "Matemática":
            image = "/imgs/disciplinas/matematicas.jpg"; // Ensure file extension is included
            break;
        case "Informática":
            image = "/imgs/disciplinas/informaticas.jpg"; // Ensure file extension is included
            break;
        case "Física":
            image = "/imgs/disciplinas/fisicas.jpg"; // Ensure file extension is included
            break;
        case "EGCS":
            image = "/imgs/disciplinas/egcs.jpg"; // Ensure file extension is included
            break;
        default:
            image = "/imgs/disciplinas/matematicas.jpg"; // Fallback image
            break;
    }

    return (
        <>
            <div className="card bg-primary">
                <img src={image} className="card-img-top" alt={name} />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text mb-1">{year}ª Ano</p>
                    <p className="card-text mb-1">{semester}º Semestre</p>
                    <a href="#" className="btn btn-secondary align-bottom">Ir para disciplina</a>
                </div>
            </div>
        </>
    );
}
