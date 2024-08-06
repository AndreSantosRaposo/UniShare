import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export default function Upload() {
    const disciplinas = useLoaderData();
    const sortedDisciplinas = disciplinas.sort((a, b) => a.name.localeCompare(b.name));
    const opcoes = sortedDisciplinas.map(disciplina => (
        <option key={disciplina._id} value={disciplina._id}>
            {disciplina.name}
        </option>
    ));

    return (
        <main className="w-50 mx-auto">
            <h1 className="pt-3">Fazer upload de ficheiros</h1>
            <form className="needs-validation">
                <div className="mb-2 mt-4">
                    <label htmlFor="disciplinaSelect"><strong>Escolha uma disciplina</strong></label>
                    <select id="disciplinaSelect" className="form-select" aria-label="Default select menu">
                        <option value="">Open this select menu</option>
                        {opcoes}
                    </select>
                </div>
                
                <div>
                    <label className="mt-3"><strong>Escolha a categoria</strong></label>
                    <div className="form-check  my-2 p-3 text-start border border-2 rounded d-flex align-items-center">
                        <input className="form-check-input mx-2" type="radio" name="filetype" id="teoria"/>
                        <label className="form-check-label fs-5" htmlFor="teoria">Materiais e resumos</label>
                    </div>
                    <div className="form-check my-2 p-3 text-start border border-2 rounded d-flex align-items-center">
                        <input className="form-check-input mx-2" type="radio" name="filetype" id="exames"/>
                        <label className="form-check-label fs-5" htmlFor="exames">Exames anteriores</label>
                    </div>
                    <div className="form-check my-2 p-3 text-start border border-2 rounded d-flex align-items-center">
                        <input className="form-check-input mx-2" type="radio" name="filetype" id="sheets"/>
                        <label className="form-check-label fs-5" htmlFor="sheets">Folhas de exercicios</label>
                    </div>
                </div>
            </form>
        </main>
    );
}
