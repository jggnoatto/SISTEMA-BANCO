import './cadastro.css';
import { Link } from 'react-router-dom';
import Apresentacao from '../Apresentacao/apresentacao';
import Header from '../Header/header';

function Cadastro () {
    return (
        <div className="cadastro">
            <Apresentacao />
            <div className="formCadastro">
                <h2>Crie sua conta</h2>
                <input type="text" placeholder="Nome Completo" />
                <input type="text" placeholder="CPF: _ _ _ . _ _ _ . _ _ _ - _ _" />
                <input type="email" placeholder="E-mail" />
                <input type="password" placeholder="Senha" />
                <input type="password" placeholder="Confirme sua senha" />
                <button>ABRIR CONTA</button>
                <p>Já possui uma conta?</p>
                <Link to="/inicio">Entrar com conta existente</Link>
            </div>
        </div>
    )
}

export default Cadastro