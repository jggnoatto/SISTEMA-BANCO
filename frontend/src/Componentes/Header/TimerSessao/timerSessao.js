// TimerSessao.js
import React, { useState, useEffect } from 'react';
import ModalExpirado from './ModalExpirado/modalExpirado'; // Certifique-se do caminho correto
import './timerSessao.css';

const TimerSessao = ({ minutos }) => {
    const [isExpiradoOpen, setIsExpiradoOpen] = useState(false); // NOVO ESTADO AQUI
    const tempoInicialSegundos = minutos * 60;
    const [tempoRestante, setTempoRestante] = useState(tempoInicialSegundos);

    useEffect(() => {
        if (tempoRestante <= 0) {
            console.log("Sessão expirada. Abrindo modal.");
            // 1. Quando o tempo acaba, abre o modal
            setIsExpiradoOpen(true); 
            return;
        }

        const timerId = setInterval(() => {
            setTempoRestante((prevTempo) => prevTempo - 1);
        }, 1000);

        return () => clearInterval(timerId);

    }, [tempoRestante]);

    const minutosRestantes = Math.floor(tempoRestante / 60);
    const segundosRestantes = tempoRestante % 60;
    
    const tempoFormatado = `${String(minutosRestantes).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;

    return (
        <>
            <div className="timer-sessao">
                <span>
                    Sessão expira em: 
                    <span className={`tempo-restante ${tempoRestante <= 60 ? 'alerta' : ''}`}>
                        {' '}{tempoFormatado}
                    </span>
                </span>
            </div>
            
            <ModalExpirado
                show={isExpiradoOpen} 
                // O onClose é chamado pelo ModalExpiracao e apenas zera o estado aqui.
                onClose={() => setIsExpiradoOpen(false)} 
            />
        </>
    );
};

export default TimerSessao;