import Logo from "./Logo/logo"
// import { useAuth } from "../../Contextos/auth"
import './header.css'

const Header = () => {
    // const { estaLogado, usuario } = useAuth();
    
    // const nomeUsuario = usuario ? usuario.nome : 'Usuário'; 
    // const cpfMascarado = usuario ? usuario.cpf_mascarado : '***.***.***-**'; 

    return (
        <header className="header">
            <Logo />
            {/* {estaLogado ? (
                <div className="informacoes-usuario">
                    <span>
                        Bem-vindo(a), {nomeUsuario} | CPF: {cpfMascarado}
                    </span>
                    <TimerSessao minutos={5} /> 
                </div>
            ) : (
                null
            )} */}
        </header> 
    );
}
        

export default Header