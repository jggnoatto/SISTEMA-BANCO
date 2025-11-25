package br.com.metalbank.backend.controller;

import br.com.metalbank.backend.dto.TransacaoDTO;
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

    // POST /conta/depositar?contaId=1&valor=100.50
    @PostMapping("/depositar")
    public ResponseEntity<?> depositar(@RequestParam TransacaoDTO dto) {
        try {
            BigDecimal novoSaldo = contaService.depositar(dto.getContaID(), dto.getValor());
            return ResponseEntity.ok(novoSaldo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // POST /conta/saque?contaId=1&valor=50.00
    @PostMapping("/saque")
    public ResponseEntity<?> sacar(@RequestParam TransacaoDTO dto) {
        try {
            BigDecimal novoSaldo = contaService.sacar(dto.getContaID(), dto.getValor());
            return ResponseEntity.ok(novoSaldo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
