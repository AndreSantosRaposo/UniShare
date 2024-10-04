//Component used in perfil page to show all my favourite classes
import { Link } from "react-router-dom";
export default function DisciplinaFavorita({ name, year, semester, id }) {
    return (
        <div className="col-6"> {/* Bootstrap grid column */}
            <div className="card h-100 bg-primary"> {/* Ensure full height */}
                <div className="card-body d-flex flex-column"> {/* Flexbox for body content */}
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text mb-1">{year}ª Ano</p>
                    <p className="card-text mb-1">{semester}º Semestre</p>
                    <div className="mt-auto"> {/* Push button to bottom */}
                        <Link to={`${id}`} state={{ name }} className="btn btn-secondary">Ir para disciplina</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

