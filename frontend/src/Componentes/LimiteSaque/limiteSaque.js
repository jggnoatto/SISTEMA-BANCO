import "./limiteSaque.css";

function LimiteSaque ({saque}) {
    return (
        <div className="limite">
            <h2>Limite de Saque Diário</h2>
            <p>R$ {saque}</p>
        </div>
    )
}

export default LimiteSaque;