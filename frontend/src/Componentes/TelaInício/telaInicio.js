import "./telaInicio.css";
import { Link, link } from "react-router-dom";
import SideBar from "../SideBar/sideBar";

function TelaInicio() {
    return (
        <div className="tela-inicio">
            <SideBar/>
            <div className="functions-container">
                <section className="saldo-card">
                    <h2>Saldo Disponível</h2>
                    <p>R$ 5.000,00</p>
                </section>

                <section className="functions-card">
                    <section className="functions-button">
                        <Link to="/depósito">
                            <button>
                            
                            </button>
                           <p>Depositar</p>
                        </Link>
                    </section>
                    <section className="functions-button">
                        <Link to="/saque">
                            <button>
                            
                            </button>
                            <p>Sacar</p>
                        </Link>
                    </section>
                </section>
            </div>
        </div>
    );
}

export default TelaInicio;