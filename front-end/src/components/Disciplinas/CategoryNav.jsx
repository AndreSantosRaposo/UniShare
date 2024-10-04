import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useLoaderData } from 'react-router-dom';
import CardCategory from './cards/CardCategory';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DisciplinaMaterial() {
    const location = useLocation();
    const { state } = location || {};
    const { name } = state || {};
    const params = useParams();
    const [favourites, setFavourites] = useState(useLoaderData());
    const [isFavourite, setIsFavourite] = useState(false); // Start as false

    // Function to check if the item is in favourites
    function favouriteHandler() {
        if (favourites.includes(params.cadeiraId)) {
            setIsFavourite(true);
        } else {
            setIsFavourite(false);
        }
    }

    // useEffect to run the favouriteHandler whenever favourites change
    useEffect(() => {
        favouriteHandler();
    }, [favourites]);  // Now it updates when favourites change

    async function clickHandler (){
        const subjectId = params.cadeiraId;
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        if (favourites.includes(subjectId)) {  // If already in favourites, remove it
                const response = await fetch('http://localhost:3000/api/v1/users/removeFavourite', {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ disciplinaID: subjectId })
                });

                if (!response.ok) {
                    throw new Error('Failed to remove from favourites');
                }

                // Update the favourites state to trigger a re-render
                setFavourites(prevFavourites => prevFavourites.filter(id => id !== subjectId));
        } else {  // If not in favourites, add it
            try {
                const response = await fetch('http://localhost:3000/api/v1/users/addFavourite', {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ disciplinaID: subjectId })
                });

                if (!response.ok) {
                    throw new Error('Failed to add to favourites');
                }

                // Update the favourites state to trigger a re-render
                setFavourites(prevFavourites => [...prevFavourites, subjectId]);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <main className="container-fluid bg-dark text-white vh-100 py-5">
            <div className="container">
                <h1 className="mb-4 text-center">{name || "Disciplina"}</h1>
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
                <p className='mt-5 fs-4'>
                    Adicionar disciplina aos favoritos:
                    <button onClick={clickHandler} className='fs-3 bg-transparent border-0'>
                        {isFavourite ? <i className="bi bi-star-fill"></i> : <i className="bi bi-star"></i>}
                    </button>
                </p>
            </div>
        </main>
    );
}
