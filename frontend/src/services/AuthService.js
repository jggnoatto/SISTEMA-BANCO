import axios from "axios";

const API_URL = "http://localhost:8080/auth";

const login = async (cpf, senha) => {
  return axios.post(`${API_URL}/login`, {
    cpf: cpf,
    senha: senha,
  });
};

const cadastrar = async (nome, cpf, email, senha) => {
  return axios.post(`${API_URL}/cadastrar`, {
    nome: nome,
    cpf: cpf,
    email: email,
    senha: senha,
  });
};

export default {
  login,
  cadastrar
};
