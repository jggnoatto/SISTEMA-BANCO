package br.com.metalbank.backend.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UsuarioResponseDTO {
    private Long id;
    private String nome;
    private String cpf;
    private String email;
    private BigDecimal saldo;
}
