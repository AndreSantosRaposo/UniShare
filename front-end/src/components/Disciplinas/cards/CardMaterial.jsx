// CardMaterial Component
import React, { useState } from 'react';
import Modal from 'react-modal';

export default function CardMaterial({ name, description, createdDate, id }) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewData, setPreviewData] = useState(null);

    // Function to handle file preview
    const handlePreview = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/files/view/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch preview');
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setPreviewData(url);
            setIsPreviewOpen(true);
        } catch (error) {
            console.error('Error fetching preview:', error);
        }
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setIsPreviewOpen(false);
        URL.revokeObjectURL(previewData); // Clean up the object URL
        setPreviewData(null);
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
            <Modal isOpen={isPreviewOpen} onRequestClose={handleCloseModal} contentLabel="File Preview">
                <h2>{name}</h2>
                {previewData && (
                    <div style={{ textAlign: 'center' }}>
                        <img src={previewData} alt={name} style={{ maxWidth: '100%' }} />
                    </div>
                )}
                <button onClick={handleCloseModal} className="btn btn-primary mt-3">
                    Close
                </button>
            </Modal>
        </div>
    );
}
