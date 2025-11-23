import './login.css';
import InputMask from "react-input-mask";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import Apresentacao from '../Apresentacao/apresentacao';
import MainButton from '../MainButton/mainButton';
import AuthService from '../../services/AuthService'; // <-- IMPORTANTE

function Login () { 
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await AuthService.login(cpf, senha);

            // salva o usuário logado
            localStorage.setItem("usuario", JSON.stringify(response.data));

            navigate("/inicio");

        } catch (error) {
            setErro("CPF ou senha inválidos.");
        }
    };

    return (
        <main className="main">
            <Apresentacao />

            <div className="login">
                <h2>Acesse sua conta</h2>

                <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ""); // remove tudo que não é número
                        setCpf(value);
                    }}
                    maxLength={11}
                />

                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <p className='avisoBan'>
                    Se não inserir a senha correta em 3 tentativas seu acesso será bloqueado.
                </p>

                <MainButton 
                    texto="ENTRAR" 
                    onClick={handleLogin}
                />

                {erro && <p style={{ color: "red" }}>{erro}</p>}

                <p>Ainda não possui uma conta?</p>
                <Link to="/cadastro">Cadastre-se</Link>
            </div>
        </main>
    );
}

export default Login;
