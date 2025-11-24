import Logo from "./Logo/logo"  
import { useState,UseEffect } from "react";
import TimerSessao from "./TimerSessao/timerSessao"; // Não se esqueça de importar
import './header.css'

const Header = () => {
    // CORREÇÃO: Inicializa o estado como um objeto
    // e usa 'const [usuarioInfo, setUsuarioInfo] = useState(...)'.
    // Os dados iniciais devem ser FALSOS/VAZIOS.
    const [usuarioInfo, setUsuarioInfo] = useState({
        estaLogado: false,
        usuario: { nome: 'Usuário', cpf_mascarado: '***.***.***-**' }
    });
    
    // Simulação: Na prática, você usaria 'useEffect' para buscar os dados da API
    /*
    useEffect(() => {
        fetch('/api/usuario/info') // Endpoint do Spring Boot
            .then(res => res.json())
            .then(data => {
                setUsuarioInfo({
                    estaLogado: data.estaLogado,
                    usuario: {
                        // Extrai apenas o primeiro nome (opcional)
                        nome: data.nome.split(' ')[0], 
                        cpf_mascarado: data.cpf_mascarado
                    }
                });
            });
    }, []);
    */

    // Desestruturação dos dados para uso:
    const { estaLogado } = usuarioInfo;
    const nomeUsuarioCompleto = usuarioInfo.usuario.nome;
    const cpfMascarado = usuarioInfo.usuario.cpf_mascarado;

    // Lógica para pegar APENAS o primeiro nome:
    const primeiroNome = nomeUsuarioCompleto.split(' ')[0];

    return (
        <header className="header">
            <Logo />
             {estaLogado ? (
                <div className="informacoes-usuario">
                    <span>
                        Bem-vindo(a), {primeiroNome} | CPF: {cpfMascarado} 
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