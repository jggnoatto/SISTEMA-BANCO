package br.com.metalbank.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "contas")

public class Conta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private BigDecimal saldo = BigDecimal.ZERO; // Começa com 0.00

    @Column(nullable = false)
    private BigDecimal limiteDiarioSaque = new BigDecimal("1000.00"); // RF 9

    @Column(nullable = false)
    private  BigDecimal limiteDiarioDeposito = new BigDecimal("1000.00");


    // Join para ligar usuário

    @OneToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;

    // Cria a coluna usuario_id que é uma foreign key com referencia
    // em id (Primary Key) da tabela usuarios


    // GETTERS E SETTERS


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public BigDecimal getLimiteDiarioSaque() {
        return limiteDiarioSaque;
    }

    public void setLimiteDiarioSaque(BigDecimal limiteDiarioSaque) {
        this.limiteDiarioSaque = limiteDiarioSaque;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }

    public BigDecimal getLimiteDiarioDeposito() {
        return limiteDiarioDeposito;
    }

    public void setLimiteDiarioDeposito(BigDecimal limiteDiarioDeposito) {
        this.limiteDiarioDeposito = limiteDiarioDeposito;
    }
}
