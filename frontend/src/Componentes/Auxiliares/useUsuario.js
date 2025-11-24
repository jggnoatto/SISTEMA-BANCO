// Essa função vai ser utilizada para ser chamada nos arquivos que precisam de dados do usuário
// Por exemplo a tela de saque precisa do saldo atual do usuário, entao ela vai chamar esse arquivo
// <SaldoDisponivel saldo={usuario?.saldo ?? 0} />


import { useState, useEffect } from "react";

export function useUsuario() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const dados = localStorage.getItem("usuario");
        if (dados) {
            setUsuario(JSON.parse(dados));
        }
    }, []);

    return usuario;
}
