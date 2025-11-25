// Essa função vai ser utilizada para ser chamada nos arquivos que precisam de dados do usuário
// Por exemplo a tela de saque precisa do saldo atual do usuário, entao ela vai chamar esse arquivo
// <SaldoDisponivel saldo={usuario?.saldo ?? 0} />


import { useState, useEffect } from "react";

export function useUsuario() {
    const [usuario, setUsuario] = useState(() => {
        const dados = localStorage.getItem("usuario");
        return dados ? JSON.parse(dados) : null;
    });

    useEffect(() => {
        const atualizar = () => {
            const dados = localStorage.getItem("usuario");
            setUsuario(dados ? JSON.parse(dados) : null);
        };

        // quando login alterar o usuário
        window.addEventListener("usuario-atualizado", atualizar);

        return () => {
            window.removeEventListener("usuario-atualizado", atualizar);
        };
    }, []);

    return usuario;
}
