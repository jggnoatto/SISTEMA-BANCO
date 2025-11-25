package br.com.metalbank.backend.service;

import br.com.metalbank.backend.domain.Conta;
import br.com.metalbank.backend.dto.DepositoResponseDTO;
import br.com.metalbank.backend.dto.SaqueDTO;
import br.com.metalbank.backend.repository.ContaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ContaService {

    @Autowired
    private ContaRepository contaRepository;

    // Depósito
    @Transactional
    public DepositoResponseDTO depositar(Long contaId, BigDecimal valor, String senhaDigitada) {
        if (valor == null || valor.compareTo(BigDecimal.ZERO) <= 0){
            throw new RuntimeException("O valor do depósito deve ser maior que zero");
        }

        Conta conta = contaRepository.findByUsuarioId(contaId)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada"));

        // Validação simples da senha
        if (!conta.getUsuario().getSenha().equals(senhaDigitada)) {
            throw new RuntimeException("Senha Incorreta");
        }

        // Verificação do limite diário
        BigDecimal limite = conta.getLimiteDiarioDeposito();
        BigDecimal novoLimiteDeposito = limite.subtract(valor);

        if (novoLimiteDeposito.compareTo(BigDecimal.ZERO) < 0) {
            throw new RuntimeException("Limite diário de depósito atingido");
        }

        // Atualiza saldo e limite
        BigDecimal novoSaldo = conta.getSaldo().add(valor);
        conta.setSaldo(novoSaldo);
        conta.setLimiteDiarioDeposito(novoLimiteDeposito);

        contaRepository.save(conta);

        return new DepositoResponseDTO(novoSaldo, novoLimiteDeposito);
    }

    // Saque
    @Transactional
    public SaqueDTO sacar(Long contaId, BigDecimal valor, String senhaDigitada) {
        if (valor == null || valor.compareTo(BigDecimal.ZERO) <= 0){
            throw new RuntimeException("O valor do saque deve ser maior que zero");
        }

        Conta conta = contaRepository.findByUsuarioId(contaId)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada"));

        if (!conta.getUsuario().getSenha().equals(senhaDigitada)) {
            throw new RuntimeException("Senha Incorreta");
        }

        if (conta.getSaldo().compareTo(valor) < 0){
            throw new RuntimeException("Saldo insuficiente para realizar o saque");
        }

        // Verificação do Limite de Saque diário
        BigDecimal limite = conta.getLimiteDiarioSaque();
        BigDecimal novoLimiteSaque = limite.subtract(valor);

        if (novoLimiteSaque.compareTo(BigDecimal.ZERO) < 0) {
            throw new RuntimeException("Limite diário de saque atingido");
        }

        // Atualiza saldo e limite
        BigDecimal novoSaldo = conta.getSaldo().subtract(valor);
        conta.setSaldo(novoSaldo);
        conta.setLimiteDiarioSaque(novoLimiteSaque);

        contaRepository.save(conta);

        return new SaqueDTO(novoSaldo, novoLimiteSaque, senhaDigitada);
    }
}
