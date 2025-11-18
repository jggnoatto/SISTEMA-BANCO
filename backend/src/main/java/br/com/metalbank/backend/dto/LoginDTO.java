package br.com.metalbank.backend.dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String cpf;
    private String senha;

    // GETTERS E SETTERS


    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
