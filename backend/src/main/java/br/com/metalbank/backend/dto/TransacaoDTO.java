package br.com.metalbank.backend.dto;

import java.math.BigDecimal;

public class TransacaoDTO {
    private Long contaID;
    private BigDecimal valor;

    public Long getContaID() {
        return contaID;
    }

    public void setContaID(Long contaID) {
        this.contaID = contaID;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }
}
