import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import CardCategory from './cards/CardCategory';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DisciplinaMaterial() {
    const location = useLocation(); // Use useLocation to get the current location
    const { state } = location || {}; // Access state from location
    const { name } = state || {}; // Destructure name from state

    return (
        <main className="container-fluid bg-dark text-white vh-100 py-5">
            <div className="container">
                <h1 className="mb-4 text-center">{name || "Disciplina"} </h1> {/* Default text if name is undefined */}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    <div className="col">
                        <CardCategory nome="Materiais e resumos" />
                    </div>
                    <div className="col">
                        <CardCategory nome="Exames anteriores" />
                    </div>
                    <div className="col">
                        <CardCategory nome="Folhas de exercicios" />
                    </div>
                </div>
            </div>
        </main>
    );
}
