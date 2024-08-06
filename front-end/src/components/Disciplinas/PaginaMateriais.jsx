import React from 'react';
import { useParams } from 'react-router-dom';
import CardMaterial from './CardMaterial';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DisciplinaMaterial() {
    const { cadeiraNome } = useParams();

    return (
        <main className="container-fluid bg-dark text-white vh-100 py-5">
            <div className="container">
                <h1 className="mb-4 text-center">{cadeiraNome}</h1>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    <div className="col">
                        <CardMaterial nome="Materiais e resumos" />
                    </div>
                    <div className="col">
                        <CardMaterial nome="Exames anteriores" />
                    </div>
                    <div className="col">
                        <CardMaterial nome="Folhas de exercicios" />
                    </div>
                </div>
            </div>
        </main>
    );
}
