import React, { useState, useEffect } from 'react';
import './timerSessao.css'; // Crie este arquivo CSS para estilização

/**
 * Componente que exibe e gerencia o tempo restante da sessão.
 * @param {object} props
 * @param {number} props.minutos - O tempo inicial da sessão em minutos.
 */
const TimerSessao = ({ minutos }) => {
    const tempoInicialSegundos = minutos * 60;
    
    const [tempoRestante, setTempoRestante] = useState(tempoInicialSegundos);

    useEffect(() => {
        if (tempoRestante <= 0) {
            console.log("Sessão expirada. Redirecionando para login...");
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
        <div className="timer-sessao">
            <span>
                Sessão expira em: 
                <span className={`tempo-restante ${tempoRestante <= 60 ? 'alerta' : ''}`}>
                    {' '}{tempoFormatado}
                </span>
            </span>
        </div>
    );
};

export default TimerSessao;