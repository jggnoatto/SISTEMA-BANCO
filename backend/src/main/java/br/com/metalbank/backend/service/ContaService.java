package br.com.metalbank.backend.service;

import br.com.metalbank.backend.domain.Conta;
import br.com.metalbank.backend.repository.ContaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ContaService {

    @Autowired
    private ContaRepository contaRepository;

    //Depósito
    @Transactional
    public BigDecimal depositar(Long contaId, BigDecimal valor) {
        if (valor == null || valor.compareTo(BigDecimal.ZERO) <= 0){
            throw new RuntimeException("O valor do depósito deve ser maior que zero");
        }

        Conta conta = contaRepository.findByUsuarioId(contaId)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada"));

        BigDecimal novoSaldo = conta.getSaldo().add(valor);
        conta.setSaldo(novoSaldo);

        contaRepository.save(conta);

        return novoSaldo;
    }

    // Saque

    @Transactional
    public BigDecimal sacar(Long contaId, BigDecimal valor) {
        if (valor == null || valor.compareTo(BigDecimal.ZERO) <= 0){
            throw new RuntimeException("O valor do saque deve ser maior que zero");
        }

        Conta conta = contaRepository.findByUsuarioId(contaId)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada"));

        if (conta.getSaldo().compareTo(valor) < 0){
            throw new RuntimeException("Saldo insuficiente para realizar o saque");
        }

        BigDecimal novoSaldo = conta.getSaldo().subtract(valor);
        conta.setSaldo(novoSaldo);

        contaRepository.save(conta);

        return novoSaldo;
    }
}
