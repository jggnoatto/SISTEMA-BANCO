package br.com.metalbank.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepositoDTO {
    private Long contaID;
    private BigDecimal valor;
    private String senha; // senha digitada no modal
}
