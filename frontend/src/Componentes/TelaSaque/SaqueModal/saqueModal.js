import React from 'react';
import MainButton from '../../MainButton/mainButton'; 
import './saqueModal.css';

function SaqueModal({ show, onClose, operacao }) {
    if (!show) {
        return null;
    }

    // Função para impedir que o clique dentro do conteúdo do modal o feche
    const handleContentClick = (e) => {
        e.stopPropagation();
    };
    
    // Função de confirmação
    const handleConfirm = () => {
        // ⚠️ Lógica de validação de senha e chamada à API Java viria aqui ⚠️
        alert('Simulação: Saque confirmado! (Chamar API)');
        onClose(); 
    };

    return (
        // 1. O clique no fundo escuro chama o onClose (fecha o modal)
        <div className="modal-backdrop" onClick={onClose}> 
            
            {/* 2. O clique no modal-content é parado (para não fechar) */}
            <div className="modal-content" onClick={handleContentClick}>
                
                {/* 3. Botão 'X' para fechar (opcional, mas bom para usabilidade) */}
                <button className="close-button" onClick={onClose}>&times;</button>
                
                <h2 className="modal-title">Está tudo certo para o seu {operacao} !</h2>
                
                <p className="modal-subtitle">Digite sua senha e confirme novamente</p>
                
                <input 
                    type="password" 
                    placeholder="Senha"
                    className="modal-input"
                />
                
                {/* 4. Botão de Confirmação */}
                <MainButton
                    texto="CONFIRMAR"
                    onClick={handleConfirm}
                    className="modal-confirm-button"
                />
                
                {/* 5. Aviso de Segurança (conforme protótipo) */}
                <p className="modal-security-warning">
                    Se não inserir a senha correta em 3 tentativas seu acesso será bloqueado por alguns instantes.
                </p>
            </div>
        </div>
    );
}

export default SaqueModal;