import { useEffect, useState } from "react";
import DisciplinaFavorita from "./Disciplinas/cards/CardDisciplinaFavorita";
import { useLoaderData, useNavigate } from "react-router-dom";
import getDisciplinasComInfo from "../loaders/getFavouritesInfo";
import CardMaterial from "./Disciplinas/cards/CardMaterial";

export default function Perfil() {
    const navigate = useNavigate();
    const loaderData = useLoaderData();
    const [view, setView] = useState("favorites"); // State to toggle between views
    const [cadeirasData, setCadeirasData] = useState(loaderData.data || { cadeiras: [], totalPages: 1 });
    const { cadeiras = [], totalPages = 1 } = cadeirasData;
    const [userData, setUserData] = useState(loaderData.dataUser);
    const [publishedFiles, setPublishedFiles] = useState([]); // State to store published files
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = Number(urlParams.get('page')) || 1;
    
    useEffect(() => {
        const fetchCadeiras = async () => {
            const data = await getDisciplinasComInfo(currentPage);
            setCadeirasData(data.data);
        };

        if (view === "favorites") {
            fetchCadeiras();
        }
    }, [currentPage, view]);

    // Fetch published files when "Ficheiros Publicados" is selected
    useEffect(() => {
        async function fetchPublishedFiles(){
            const token = localStorage.getItem('token');
            const response = await fetch("https://unishare-7vk2.onrender.com/files/postedFiles",{
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const result = await response.json();
            setPublishedFiles(result.files); 
        };
        if (view === "files") {
            fetchPublishedFiles();
        }
    }, [view]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            navigate(`?page=${page}`);
        }
    };

    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                <button className="page-link bg-secondary text-black" onClick={() => handlePageChange(i)}>
                    {i}
                </button>
            </li>
        );
    }

    const displayCadeiras = cadeiras.length > 0 ? (
        cadeiras.map(cadeira => (
            <DisciplinaFavorita key={cadeira._id} name={cadeira.name} year={cadeira.year} semester={cadeira.semester} id={cadeira._id} />
        ))
    ) : (
        <p>Nenhuma cadeira favorita encontrada.</p>
    );

    const displayFiles = publishedFiles.length > 0 ? (
        publishedFiles.map(file => (
            <CardMaterial key={file._id} name={file.name} description={file.description} createdDate={file.createdAt} id={file._id} />
        ))
    ) : (
        <p>Nenhum ficheiro publicado encontrado.</p>
    );

    function handleLogOut(){
        console.log("ahhh");
        localStorage.removeItem('token');
        navigate('/auth/login');
    }


    return (
        <main>
            <section className="mt-3">
                <h1 className="fs-3 mb-3">Informação da conta:</h1>
                <ul className="list-group col-lg-4 col-9 text-start m-auto">
                    <p className="list-group-item">Nome: {userData.firstName + " " + userData.lastName}</p>
                    <p className="list-group-item">Username: {userData.username}</p>
                    <p className="list-group-item">Email: {userData.email}</p>
                </ul>
                <button className="btn btn-secondary" onClick={handleLogOut}>Log out</button>
            </section>
            <div className="btn-group mt-5" role="group" aria-label="Basic radio toggle button group">
                <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="btnradio1"
                    autoComplete="off"
                    checked={view === "favorites"}
                    onChange={() => setView("favorites")}
                />
                <label className="btn btn-outline-secondary" htmlFor="btnradio1">
                    Disciplinas favoritas
                </label>

                <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="btnradio2"
                    autoComplete="off"
                    checked={view === "files"}
                    onChange={() => setView("files")}
                />
                <label className="btn btn-outline-secondary" htmlFor="btnradio2">
                    Ficheiros Publicados
                </label>
            </div>

            <div className="container w-50 mx-auto mt-4 pb-2 d-block">
                <div className="row gx-2 gy-2">
                    {view === "favorites" ? displayCadeiras : displayFiles}
                </div>

                {view === "favorites" && (
                    <ul className="pagination justify-content-center mt-3">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link bg-secondary text-black" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                Previous
                            </button>
                        </li>
                        {paginationItems}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link bg-secondary text-black" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                Next
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </main>
    );
}
