import Logo from "./Logo/logo"  
import TimerSessao from "./TimerSessao/timerSessao"; // Não se esqueça de importar
import './header.css'
import { Link } from "react-router-dom";
import { useUsuario } from "../Auxiliares/useUsuario";
import { useLocation } from "react-router-dom";


const Header = () => {
    const location = useLocation();

    // Nessas páginas o Header deve aparecer SEM infos de usuário
    const paginasSemUsuario = ["/", "/login", "/cadastro"];

    const esconderInfoUsuario = paginasSemUsuario.includes(location.pathname);

    const usuario = useUsuario();
    const estaLogado = !!usuario && !esconderInfoUsuario; // true se existir usuário no localStorage

    return (
        <header className="header">
            <Logo />
             {estaLogado ? (
                <div className="informacoes-usuario">
                    <span>
                        Bem-vindo(a), {usuario.nome.split(" ")[0]} | CPF: {usuario.cpf} 
                    </span>
                    <section className="sessao">
                        <TimerSessao minutos={5} />
                        <Link to="/login">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                            </svg>
                        </Link>
                    </section>
                    
                </div>
            ) : (
                null
            )} 
        </header> 
    );
}
    
export default Header;