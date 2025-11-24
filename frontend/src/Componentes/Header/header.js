import Logo from "./Logo/logo"  
import TimerSessao from "./TimerSessao/timerSessao"; // Não se esqueça de importar
import './header.css'
import { useUsuario } from "../Auxiliares/useUsuario";

const Header = () => {
    const usuario = useUsuario();

    const estaLogado = !!usuario; // true se existir usuário no localStorage

    return (
        <header className="header">
            <Logo />
             {estaLogado ? (
                <div className="informacoes-usuario">
                    <span>
                        Bem-vindo(a), {usuario.nome.split(" ")[0]} | CPF: {usuario.cpf} 
                    </span>
                    <TimerSessao minutos={5} /> 
                </div>
            ) : (
                null
            )} 
        </header> 
    );
}
    
export default Header;