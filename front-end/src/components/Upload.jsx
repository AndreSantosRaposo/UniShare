import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export default function Upload() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') != null);
    const disciplinas = useLoaderData();
    const sortedDisciplinas = disciplinas.sort((a, b) => a.name.localeCompare(b.name));
    const opcoes = sortedDisciplinas.map((disciplina) => (
        <option key={disciplina._id} value={disciplina._id}>
            {disciplina.name}
        </option>
    ));

    const [fileName, setFileName] = useState("");
    const [fileError, setFileError] = useState("");

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
            if (allowedTypes.includes(file.type)) {
                setFileName(file.name);
                setFileError(""); // Clear any previous error message
            } else {
                setFileName("");
                setFileError("Invalid file type. Please select a PDF, PNG, or JPEG file.");
                e.target.value = ""; // Reset the file input
            }
        } else {
            setFileName("");
        }
    }

    useEffect(() => {
        const form = document.querySelector('.needs-validation');
        form.addEventListener(
            "submit",
            (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add("was-validated");
            },
            false
        );
    }, []);

    async function handleFormSubmit(event){
        if(!isLoggedIn){
            setFileError("Not logged in");
        }
        event.preventDefault();
        const form = event.target;

        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        const formData = new FormData(form);
        const file = formData.get('file');

        if (!file) {
            setFileError("Please select a file before submitting.");
            return;
        }

        // Sending the data along with the file as a FormData object to maintain the ability to send files
        const token = localStorage.getItem('token');
        const response = await fetch('https://unishare-7vk2.onrender.com/files/upload', {
            method: 'POST',
            body: formData, // Send FormData directly
            headers: {
                'Authorization': `Bearer ${token}` // Inclua o token JWT aqui
            }
        });

        if (!response.ok) {
            console.log(response);
            throw new Error('Failed to upload file.');
        }

        const result = await response.json();
        alert('File uploaded successfully!');
        console.log(result);
    };

    return (
        <main className="w-50 mx-auto">
            <h1 className="pt-3">Fazer upload de ficheiros</h1>
            <form className="needs-validation" noValidate onSubmit={handleFormSubmit}>
                <div className="mb-2 mt-4">
                    <label htmlFor="disciplinaSelect">
                        <strong>Escolha uma disciplina</strong>
                    </label>
                    <select id="disciplinaSelect" className="form-select" name="subjects" aria-label="Default select menu" required>
                        <option value="">Abra o menu para selecionar</option>
                        {opcoes}
                    </select>
                    <div className="invalid-feedback">Por favor, escolha uma disciplina.</div>
                </div>

                <div>
                    <label className="mt-3">
                        <strong>Escolha a categoria</strong>
                    </label>
                    <div className="form-check my-2 p-3 text-start border border-2 rounded d-flex align-items-center">
                        <input className="form-check-input mx-2" type="radio" name="filetype" id="teoria" value="teoria" required />
                        <label className="form-check-label fs-5" htmlFor="teoria">
                            Materiais e resumos
                        </label>
                    </div>
                    <div className="form-check my-2 p-3 text-start border border-2 rounded d-flex align-items-center">
                        <input className="form-check-input mx-2" type="radio" name="filetype" id="exames" value="exames" required />
                        <label className="form-check-label fs-5" htmlFor="exames">
                            Exames anteriores
                        </label>
                    </div>
                    <div className="form-check my-2 p-3 text-start border border-2 rounded d-flex align-items-center">
                        <input className="form-check-input mx-2" type="radio" name="filetype" id="sheets" value="sheets" required />
                        <label className="form-check-label fs-5" htmlFor="sheets">
                            Folhas de exercicios
                        </label>
                    </div>
                    <div className="invalid-feedback">Por favor, escolha uma categoria.</div>
                </div>
                <div className="d-flex flex-column">
                    <label className="mt-3" htmlFor="titulo">
                        <strong>Título do ficheiro</strong>
                    </label>
                    <input
                        placeholder="Título"
                        className="mt-2 fs-5 border border-2 rounded p-2"
                        id="titulo"
                        name="title"
                        maxLength={"50"}
                        required
                    />
                    <div className="invalid-feedback">Por favor, insira o título do ficheiro.</div>
                </div>
                <div className="d-flex flex-column">
                    <label className="mt-3" htmlFor="descrição">
                        <strong>Descrição do ficheiro</strong>
                    </label>
                    <textarea
                        placeholder="Descrição"
                        className="mt-2 fs-5 border border-2 rounded p-2 h-25"
                        id="descrição"
                        name="description"
                        maxLength={"300"}
                        required
                        style={{ resize: "none" }}
                    ></textarea>
                    <div className="invalid-feedback">Por favor, insira a descrição do ficheiro.</div>
                </div>
                <div className="mt-3 d-flex justify-content-between align-items-center">
                    <div>
                        <label>
                            <strong>Escolha um ficheiro</strong>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            name="file"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            accept=".pdf, .png, .jpg"
                            required
                        />
                        <p className="text-primary">PDF, PNG, JPEG</p>
                        <div className="invalid-feedback">Por favor, escolha um ficheiro.</div>
                        {fileError && <div className="text-danger">{fileError}</div>}
                    </div>
                    <div>
                        <label htmlFor="fileInput" className="btn btn-secondary">
                            Escolha um ficheiro
                        </label>
                        <p>{fileName ? fileName : "Nenhum ficheiro"}</p>
                    </div>
                </div>
                <button type="submit" className="btn btn-secondary w-100 mb-5">Enviar</button>
            </form>
        </main>
    );
}
