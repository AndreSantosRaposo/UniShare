import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure you have Bootstrap Icons included
import { Link } from 'react-router-dom';
export default function CardMaterial({ nome, subject }) {
    let icon;
    switch (nome) {
        case "Materiais e resumos":
            icon = "bi-file-earmark-text";
            break;
        case "Exames anteriores":
            icon = "bi-file-earmark-code";
            break;
        case "Folhas de exercicios":
            icon = "bi-file-earmark-code";
            break;
        default:
            icon = "bi-file-earmark";
    }

    return (
        <div className="card mb-3 bg-primary text-black mx-auto">
            <div className="card-body d-flex flex-column align-items-center justify-center">
                <div className="me-3">
                    <i className={`bi ${icon} fs-3`}></i>
                </div>
                <div>
                    <h5 className="card-title mb-1">{nome}</h5>
                    <p className="card-text mb-2">Materiais disponiveis</p>
                    <Link to={nome} className="btn btn-secondary">Ver mais</Link>
                </div>
            </div>
        </div>
    );
}
