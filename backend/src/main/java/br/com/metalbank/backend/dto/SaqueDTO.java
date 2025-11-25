package br.com.metalbank.backend.dto;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaqueDTO {
    private BigDecimal novoSaldo;
    private BigDecimal novoLimiteSaque;
    private String senha;
}
