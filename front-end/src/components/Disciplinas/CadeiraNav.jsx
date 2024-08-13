import CardDisciplina from "./cards/CardDisciplina";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function DisciplinaList() {
    const [disciplinas, setDisciplinas] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        year: [],
        semester: [],
        category: []
    });

    useEffect(() => {
        async function getDisciplinas() {
            const res = await fetch("http://localhost:3000/api/v1/cadeiras/buscar");
            const data = await res.json();
            setDisciplinas(data.Cadeiras);
        }
        getDisciplinas();
    }, []);

    useEffect(() => {
        const yearFilter = searchParams.getAll("year");
        const semesterFilter = searchParams.getAll("semester");
        const categoryFilter = searchParams.getAll("category");
        setFilters({
            year: yearFilter,
            semester: semesterFilter,
            category: categoryFilter
        });
    }, [searchParams]);

    useEffect(() => {
        const newSearchParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, values]) => {
            values.forEach(val => newSearchParams.append(key, val));
        });
        setSearchParams(newSearchParams);
    }, [filters, setSearchParams]); // Ensure setSearchParams is not in dependency array

    const updateFilters = (type, value) => {
        setFilters(prevFilters => {
            const currentFilters = prevFilters[type];
            const newFilters = currentFilters.includes(value)
                ? currentFilters.filter(item => item !== value)
                : [...currentFilters, value];

            return {
                ...prevFilters,
                [type]: newFilters
            };
        });
    };

    const handleCheckboxChange = (type, value) => {
        updateFilters(type, value);
    };

    let displayedDisciplinas = disciplinas.filter(disciplina =>
        (!filters.year.length || filters.year.includes(disciplina.year)) &&
        (!filters.semester.length || filters.semester.includes(disciplina.semester)) &&
        (!filters.category.length || filters.category.includes(disciplina.category))
    );

    const disciplinasElements = displayedDisciplinas.map(disciplina => (
        <div className="col-md-4" key={disciplina._id}> 
            <CardDisciplina name={disciplina.name} year={disciplina.year} semester={disciplina.semester} category={disciplina.category} id={disciplina._id} />
        </div>
    ));

    return (
        <main className="bg-dark p-5 text-start text-white">
            <h1 className="mb-3 mt-0">Disciplinas</h1>
            <div className="mb-5 container">
                <h2 className="h3">Filtros: </h2>
                <div className="row mb-3">
                    <div className="col-12 col-sm-6 col-md-4 mb-2">
                        <div className="btn-group d-flex flex-wrap my-3" role="group" aria-label="Basic checkbox toggle button group">
                            {["1", "2", "3"].map(year => (
                                <div key={year}>
                                    <input
                                        type="checkbox"
                                        className="btn-check"
                                        id={`anobtncheck${year}`}
                                        autoComplete="off"
                                        checked={filters.year.includes(year)}
                                        onChange={() => handleCheckboxChange("year", year)}
                                    />
                                    <label className="btn btn-outline-secondary" htmlFor={`anobtncheck${year}`}>
                                        Ano {year}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 mb-2 my-3">
                        <div className="btn-group d-flex flex-wrap" role="group" aria-label="Basic checkbox toggle button group">
                            {["1", "2"].map(semester => (
                                <div key={semester}>
                                    <input
                                        type="checkbox"
                                        className="btn-check"
                                        id={`semestrebtncheck${semester}`}
                                        autoComplete="off"
                                        checked={filters.semester.includes(semester)}
                                        onChange={() => handleCheckboxChange("semester", semester)}
                                    />
                                    <label className="btn btn-outline-secondary" htmlFor={`semestrebtncheck${semester}`}>
                                        Semestre {semester}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 mb-2 my-3">
                        <div className="btn-group d-flex flex-wrap" role="group" aria-label="Basic checkbox toggle button group">
                            {["Matemática", "Informática", "Física", "EGCS"].map(category => (
                                <div key={category}>
                                    <input
                                        type="checkbox"
                                        className="btn-check"
                                        id={`cadeirabtncheck${category}`}
                                        autoComplete="off"
                                        checked={filters.category.includes(category)}
                                        onChange={() => handleCheckboxChange("category", category)}
                                    />
                                    <label className="btn btn-outline-secondary" htmlFor={`cadeirabtncheck${category}`}>
                                        {category}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row gx-5 gy-4">
                {disciplinasElements.length > 0 ? disciplinasElements : (
                    <div className="w-100 d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
                        <h1 className="text-white text-center h3">Sem resultados</h1>
                    </div>
                )}
            </div>
        </main>
    );
}
