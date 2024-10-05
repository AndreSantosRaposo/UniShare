import React, { useState, useEffect } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import CardMaterial from "./cards/CardMaterial";

export default function MaterialFiles() {
  const { category, cadeiraId } = useParams();
  const navigate = useNavigate();
  const [filesData, setFilesData] = useState(useLoaderData());

  // Extract current page and sort order from the query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const currentSortOrder = urlParams.get('sortOrder') || 'decrescente';
  const currentPage = Number(urlParams.get('page')) || 1;

  const { files, totalPages } = filesData;

  useEffect(() => {
    // Function to fetch data from the API
    const fetchFilesData = async () => {
      const response = await fetch(`https://unishare-7vk2.onrender.com/files/view?cadeiraId=${cadeiraId}&category=${category}&page=${currentPage}&sortOrder=${currentSortOrder}`);
      const data = await response.json();
      setFilesData(data);
    };

    fetchFilesData();
  }, [category, cadeiraId, currentSortOrder, currentPage]);

  // Handle page changes by updating the URL with the new page number
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      navigate(`?page=${page}&sortOrder=${currentSortOrder}`);
    }
  };

  // Handle sort order changes by updating the URL with the new sort order
  const handleSortChange = (e) => {
    const sortOrder = e.target.value;
    navigate(`?page=1&sortOrder=${sortOrder}`);
  };

  // Create pagination items based on the number of total pages
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

  return (
    <main className="bg-dark min-vh-100 pb-3 text-white">
      <h1 className="pt-3">{category}</h1>
      <div className="input-group mb-3 mt-4 w-50 m-auto">
        <span className="input-group-text border bg-white" id="basic-addon1">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Procurar ficheiros"
          aria-label="Search"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="w-75 m-auto mt-5 d-flex align-items-center">
        <h2 className="h5 text-start">Ordenar por data:</h2>
        <select className="ms-2 rounded bg-primary" value={currentSortOrder} onChange={handleSortChange}>
          <option value="decrescente">Mais recente</option>
          <option value="crescente">Mais antigo</option>
        </select>
      </div>
      <div className="container border rounded mt-2 bg-primary text-black">
        <div className="row p-2 border-bottom">
          <h3 className="col h5">Titulo</h3>
          <h3 className="col h5">Descrição</h3>
          <h3 className="col h5">Upload date</h3>
          <h3 className="col h5">Ação</h3>
        </div>
        {files.map((file) => (
          <CardMaterial
            name={file.title}
            description={file.description}
            createdDate={file.createdAt}
            id={file._id}
            key={file._id}
          />
        ))}
        <ul className="pagination justify-content-center bg-primary pt-3">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link bg-secondary text-black"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {paginationItems}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link bg-secondary text-black"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </main>
  );
}
