import "./limiteDeposito.css";

function LimiteDeposito ({limite}) {
    return (
        <div className="limite">
            <h2>Limite de Depósito Diário</h2>
            <p>R$ {limite}</p>
        </div>
    )
}

export default LimiteDeposito;