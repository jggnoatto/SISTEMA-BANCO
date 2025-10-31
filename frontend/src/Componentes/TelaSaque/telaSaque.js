import SideBar from "../SideBar/sideBar"
import MainButton from "../MainButton/mainButton"
import SaldoDisponivel from "../SaldoDisponível/saldoDisponivel"
import "./telaSaque.css"
import LimiteSaque from "../LimiteSaque/limiteSaque"

function telaSaque(){
    return(
        <div>
            <SideBar/>
           <div className="functions-container">
                <div className="saldo-card">
                    <h2>Quanto você deseja sacar?</h2>
                     <section className="linha">
                        <p className="saldo-text">R$</p>
                        <input type="text" placeholder="0,00"/>
                     </section>
                </div>
                <div className="functions-card-deposito">
                    <p>Deseja confirmar seu saque?</p>
                    <MainButton
                        texto="CONFIRMAR"
                        onClick="/confirmar-saque"
                    />
                </div>
            </div>
            <section className="limite-saldo">
                <LimiteSaque saque="1.000,00"/>
                <div className="saldo-texto">
                    <SaldoDisponivel saldo="10.000,00"/>
                </div>
                
            </section>
        </div>
    )
}

export default telaSaque