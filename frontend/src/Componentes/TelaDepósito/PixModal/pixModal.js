import React from 'react';
import MainButton from '../../MainButton/mainButton'; 
import qrCode from '../../../assets/QRCODE.svg';
import { useState } from 'react';
import ConfirmationModal from '../../ConfirmationModal/confirmationModal';
import './pixModal.css';

function PixModal({ show, onClose}) {
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    if (!show) {
        return null;
    }

    const handleContentClick = (e) => {
        e.stopPropagation();
    };
    
    const handleConfirm = () => {
        setIsConfirmationOpen(true);
    };

    const handleCloseConfirmation = () => {
        setIsConfirmationOpen(false);
        onClose(); 
    };

    return (
        <>
            <div className="modal-backdrop" onClick={onClose}> 
            
            <div className="modal-content" onClick={handleContentClick}>
                
                <button className="close-button" onClick={onClose}>&times;</button>
                
                <h2 className="modal-title">Escaneie o QR-Code para confirmar seu depósito</h2>

                <img src={qrCode} alt="QR Code" className="qrCode"/>

                
                <p className="modal-subtitle">Digite sua senha e confirme novamente</p>
                
                <input 
                    type="password" 
                    placeholder="Senha"
                    className="modal-input"
                />

                
                <MainButton
                    texto="CONFIRMAR"
                    onClick={handleConfirm}
                    className="modal-confirm-button"
                />

                <p className="modal-security-warning">
                    Se não inserir a senha correta em 3 tentativas seu acesso será bloqueado por alguns instantes.
                </p>
            </div>
        </div>
        <ConfirmationModal 
                show={isConfirmationOpen} 
                onClose={handleCloseConfirmation}
                title="Depósito confirmado com sucesso!"
            />
        </>

        

    );
}

export default PixModal;