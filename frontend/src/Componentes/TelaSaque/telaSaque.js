import { useState } from "react";
import SideBar from "../SideBar/sideBar";
import MainButton from "../MainButton/mainButton";
import SaldoDisponivel from "../SaldoDisponível/saldoDisponivel";
import LimiteSaque from "../LimiteSaque/limiteSaque";
import SaqueModal from "./SaqueModal/saqueModal";
import { useUsuario } from "../Auxiliares/useUsuario";

function TelaSaque() {
  const usuario = useUsuario();
  const [valorSaque, setValorSaque] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (!valorSaque || Number(valorSaque.replace(",", ".")) <= 0) {
      alert("Digite um valor válido para saque");
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <SideBar />
      <div className="functions-container">
        <div className="saldo-card">
          <h2>Quanto você deseja sacar?</h2>
          <section className="linha">
            <p className="saldo-text">R$</p>
            <input
              type="number"
              placeholder="0,00"
              value={valorSaque}
              onChange={(e) => setValorSaque(e.target.value)}
            />
          </section>
        </div>
        <div className="functions-card-deposito">
          <p>Deseja confirmar seu saque?</p>
          <MainButton texto="CONFIRMAR" onClick={handleOpenModal} />
        </div>
      </div>

      <section className="limite-saldo">
        <LimiteSaque saque={usuario?.limiteDiarioSaque ?? "0,00"} />
        <div className="saldo-texto">
          <SaldoDisponivel saldo={usuario?.saldo ?? 0} />
        </div>
      </section>

      <SaqueModal
        show={isModalOpen}
        onClose={handleCloseModal}
        operacao="saque"
        valorSaque={valorSaque} // passa o valor para o modal
      />
    </div>
  );
}

export default TelaSaque;
