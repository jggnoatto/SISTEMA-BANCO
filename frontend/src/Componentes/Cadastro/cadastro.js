import './cadastro.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Apresentacao from '../Apresentacao/apresentacao';
import MainButton from '../MainButton/mainButton';
import AuthService from '../../services/AuthService';

function Cadastro () {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [mensagem, setMensagem] = useState('');

    const navigate = useNavigate();

    const handleCadastro = async () => {
        if (senha !== confirmarSenha) {
            setMensagem("As senhas não coincidem!");
            return;
        }

        try {
            await AuthService.cadastrar(nome, cpf, email, senha);
            setMensagem("Conta criada com sucesso!");

            setTimeout(() => navigate("/login"), 1200);

        } catch (error) {
            setMensagem("Erro ao cadastrar: " + error.response.data);
        }
    };

    return (
        <div className="cadastro">
            <Apresentacao />
            <div className="formCadastro">
                <h2>Crie sua conta</h2>

                <input 
                    type="text" 
                    placeholder="Nome Completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <input 
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />

                <input 
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <input 
                    type="password"
                    placeholder="Confirme sua senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                />

                <MainButton 
                    texto="ABRIR CONTA"
                    onClick={handleCadastro}
                />

                {mensagem && <p>{mensagem}</p>}

                <p>Já possui uma conta?</p>
                <Link to="/login">Entrar com conta existente</Link>
            </div>
        </div>
    );
}

export default Cadastro;
