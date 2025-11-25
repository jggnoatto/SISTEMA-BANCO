package br.com.metalbank.backend.controller;

import br.com.metalbank.backend.dto.DepositoResponseDTO;
import br.com.metalbank.backend.dto.SaqueDTO;
import br.com.metalbank.backend.dto.TransacaoDTO;
import br.com.metalbank.backend.dto.DepositoDTO;
import br.com.metalbank.backend.service.ContaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/conta")
@CrossOrigin(origins = "*")
public class ContaController {

    @Autowired
    private ContaService contaService;

    // POST /conta/depositar
    @PostMapping("/depositar")
    public ResponseEntity<?> depositar(@RequestBody TransacaoDTO dto) {
        try {
            DepositoResponseDTO novoSaldo = contaService.depositar(dto.getContaID(), dto.getValor(), dto.getSenha());
            return ResponseEntity.ok(novoSaldo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // POST /conta/saque
    @PostMapping("/saque")
    public ResponseEntity<?> sacar(@RequestBody TransacaoDTO dto) {
        try {
            SaqueDTO novoSaldo = contaService.sacar(dto.getContaID(), dto.getValor(), dto.getSenha());
            return ResponseEntity.ok(novoSaldo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
