import React, { useState } from 'react';
import Modal from 'react-modal';

// Defina o elemento principal do seu aplicativo
Modal.setAppElement('#root'); // Assumindo que o root é o id do seu elemento root do React

export default function CardMaterial({ name, description, createdDate, id }) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewData, setPreviewData] = useState(null);
    const [fileType, setFileType] = useState("");

    // Function to handle file preview
    const handlePreview = async () => {
        try {
            const response = await fetch(`https://unishare-7vk2.onrender.com/files/view/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch preview');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setFileType(response.headers.get("Content-Type")); // Obter o tipo de conteúdo do arquivo
            setPreviewData(url);
            setIsPreviewOpen(true);
        } catch (error) {
            console.error('Error fetching preview:', error);
        }
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setIsPreviewOpen(false);
        URL.revokeObjectURL(previewData); // Limpar o objeto URL
        setPreviewData(null);
        setFileType(""); // Resetar o tipo do arquivo
    };

    const date = createdDate.split('T')[0];

    return (
        <div className="row py-2 border-bottom align-items-center">
            <p className="col mb-0">{name}</p>
            <p className="col mb-0">{description}</p>
            <p className="col mb-0">{date}</p>
            <div className="col d-flex justify-content-center">
                <button className="btn btn-secondary btn-sm me-2" onClick={handlePreview}>
                    Preview
                </button>
                <button className="btn btn-secondary btn-sm">Download</button>
            </div>
            <Modal isOpen={isPreviewOpen} onRequestClose={handleCloseModal} contentLabel="File Preview" style={{ overlay: { zIndex: 1000 } }}>
                <h2>{name}</h2>
                {previewData && (
                    <div style={{ textAlign: 'center', position: 'relative' }}>
                        {/* Renderiza o arquivo de acordo com o tipo */}
                        {fileType === "application/pdf" ? (
                            <iframe
                                src={previewData}
                                title={name}
                                style={{ width: '100%', height: '500px', border: 'none' }}
                            />
                        ) : (
                            <img src={previewData} alt={name} style={{ maxWidth: '100%', height: 'auto' }} />
                        )}
                    </div>
                )}
                <button 
                    onClick={handleCloseModal} 
                    className="btn btn-primary mt-3" 
                    style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1050 }}>
                    Close
                </button>
            </Modal>

        </div>
    );
}
