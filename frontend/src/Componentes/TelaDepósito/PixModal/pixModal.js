import React, { useState } from 'react';
import MainButton from '../../MainButton/mainButton';
import qrCode from '../../../assets/QRCODE.svg';
import ConfirmationModal from '../../ConfirmationModal/confirmationModal';
import axios from "axios";
import './pixModal.css';

function PixModal({ show, onClose, valorDeposito }) {
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [senha, setSenha] = useState("");

    if (!show) return null;

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    const handleConfirm = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem("usuario"));

            const dto = {
                contaID: usuario.id,
                valor: Number(valorDeposito),   // vamos ver isso abaixo
                senha: senha
            };

            const response = await axios.post("http://localhost:8080/conta/depositar", dto);

            const novoSaldo = response.data.novoSaldo;
            const novoLimite = response.data.novoLimiteDeposito;

            // Atualiza o usuário no localStorage
            const novoUsuario = {
                ...usuario,
                saldo: novoSaldo,
                limiteDiarioDeposito: novoLimite
            };

            localStorage.setItem("usuario", JSON.stringify(novoUsuario));
            window.dispatchEvent(new Event("usuario-atualizado"));

            setIsConfirmationOpen(true);

        } catch (error) {
            alert(error.response?.data || "Erro ao realizar depósito");
        }
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

                    <img src={qrCode} alt="QR Code" className="qrCode" />

                    <p className="modal-subtitle">Digite sua senha e confirme novamente</p>

                    <input
                        type="password"
                        placeholder="Senha"
                        className="modal-input"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
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
