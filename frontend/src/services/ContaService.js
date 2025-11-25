import axios from "axios";

const API_URL = "http://localhost:8080/conta";

export const depositar = async (contaId, valor) => {
    return axios.post(`${API_URL}/depositar`, {
        contaID: contaId,
        valor: valor
    });
};
