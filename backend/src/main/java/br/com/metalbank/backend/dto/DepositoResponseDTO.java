package br.com.metalbank.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class DepositoResponseDTO {
    private BigDecimal novoSaldo;
    private BigDecimal novoLimiteDeposito;
}
