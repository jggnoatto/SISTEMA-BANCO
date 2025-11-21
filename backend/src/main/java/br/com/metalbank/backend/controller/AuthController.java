package br.com.metalbank.backend.controller;


import br.com.metalbank.backend.dto.LoginDTO;
import br.com.metalbank.backend.dto.CadastroUsuarioDTO;
import br.com.metalbank.backend.dto.UsuarioResponseDTO;
import br.com.metalbank.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") // LIBERA O REACT: Permite que qualquer site acesse essa API
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    // Endereço: POST http://localhost:8080/auth/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dados){
        try {
            // Chama a service para tentar logar
            UsuarioResponseDTO usuarioLogado = usuarioService.login(dados);

            // Se der certo, retorna OK e os dados do usuário
            return ResponseEntity.ok(usuarioLogado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    // Endereço: POST http://localhost:8080/auth/cadastrar
    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody CadastroUsuarioDTO dados) {
        try {
            // Chama a Service para cadastrar
            UsuarioResponseDTO usuarioCadastrado = usuarioService.cadastrar(dados);

            // Se der certo retorna 201 (Created)
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioCadastrado);
        } catch (RuntimeException e) {
            // Se der erro (CPF duplicado, etc), retorna 400 (Bad Request)
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

}
