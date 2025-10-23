import './login.css';
import InputMask from 'react-input-mask';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import Apresentacao from '../Apresentacao/apresentacao';
import MainButton from '../MainButton/mainButton';

function Login () { 
    const [cpf, setCpf] = useState('');
    return (
        <main className="main">
            <Apresentacao />

            <div className="login">
                <h2>Acesse sua conta</h2>
                <input type="text" placeholder="CPF: _ _ _ . _ _ _ . _ _ _ - _ _" />
                <input type="password" placeholder="Senha" />
                <p className='avisoBan'>Se não inserir a senha correta em 3 tentativas seu acesso será bloqueado por alguns instantes.</p>
                <MainButton
                    texto="ENTRAR" 
                    onClick="/inicio"
                />
                <p>Ainda não possui uma conta?</p>
                <Link to="/cadastro">Cadastre-se</Link>
            </div>
        </main>
    )
}

export default Login