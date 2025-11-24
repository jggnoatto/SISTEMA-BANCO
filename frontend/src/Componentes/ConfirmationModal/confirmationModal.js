import React from 'react';
import './confirmationModal.css';

function ConfirmationModal({ show, onClose, title}) {
    if (!show) {
        return null;
    }

    const handleContentClick = (e) => {
        e.stopPropagation();
    };
    

    return (

        <div className="modal-backdrop" onClick={onClose}> 
            
            <div className="modal-content" onClick={handleContentClick}>
                
                <button className="close-button" onClick={onClose}>&times;</button>
                
                <h2 className="modal-title">{title}</h2>

            </div>
        </div>
    );
}

export default ConfirmationModal;